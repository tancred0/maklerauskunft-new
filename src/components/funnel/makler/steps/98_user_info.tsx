"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, FileText, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type Control, useForm } from "react-hook-form";
import { z } from "zod";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { AgbText, CONSENT_CONFIG, computeConsentHash } from '@/config/consent-versions';
import ButtonRenderer from "@/components/ui/ButtonRenderer";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import capitalizeWords from "@/components/utils/capitalizeWords";
import verifyPhoneNumberGoogle from "@/components/utils/phoneNumber/verifyPhoneNumberGoogle";
import iconLong from "@/images/general/logo_wide_black_font.svg";
import { uploadLead } from "@/server/actions/lead-upload";
import StepsComponent from "../../steps-component";
import { Trust } from "../../trust";
import { useMaklerFunnel } from "../makler-funnel-context";

const valueProps = [
	{ icon: CheckCircle, text: "Geprüfte Makler" },
	{ icon: Lock, text: "SSL-verschlüsselt" },
	{ icon: FileText, text: "DSGVO-konform" },
];

const schema = z.object({
	user_salutation: z.enum(["Herr", "Frau"], {
		required_error: "Anrede ist erforderlich",
	}),
	user_firstname: z.string().min(1, { message: "Vorname ist erforderlich" }),
	user_lastname: z.string().min(1, { message: "Nachname ist erforderlich" }),
	user_email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
	user_phone: z
		.string()
		.min(1, { message: "Telefonnummer ist erforderlich" })
		.refine((value) => !value.startsWith("00"), {
			message:
				'Internationale Rufnummern bitte mit "+" anstelle von "00" angeben',
		})
		.refine((value) => value.replace(/[\s+\-\d]/g, "").length === 0, {
			message: 'Telefonnummer darf nur aus den Zahlen 0-9 und "+" bestehen',
		}),
});

type FormData = z.infer<typeof schema>;

interface FormFieldComponentProps {
	name: Exclude<keyof FormData, "user_salutation">;
	label: React.ReactNode;
	placeholder: string;
	control: Control<FormData>;
	required?: boolean;
	customError?: string | null;
	onClearCustomError?: () => void;
}

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
	name,
	label,
	placeholder,
	control,
	required = false,
	customError = null,
	onClearCustomError,
}) => (
	<FormField
		control={control}
		name={name}
		render={({ field, fieldState }) => {
			const displayError = fieldState.error || customError;
			const errorMessage = fieldState.error?.message || customError;

			return (
				<FormItem className="grid grid-cols-1 md:grid-cols-[1fr_3fr] md:items-center gap-1 md:gap-4 mb-2 md:mb-4">
					<FormLabel
						className="text-primary text-small md:text-base"
						htmlFor={name}
					>
						{label}
						{required && <span className="text-red-500 ml-1">*</span>}
					</FormLabel>
					<div className="flex flex-col gap-1">
						<FormControl>
							<Input
								placeholder={placeholder}
								{...field}
								className={
									displayError
										? "h-10 border-2 border-red-500 md:h-12"
										: "h-10 md:h-12"
								}
								onChange={(e) => {
									field.onChange(e);
									if (customError && onClearCustomError) {
										onClearCustomError();
									}
								}}
							/>
						</FormControl>
						{displayError && (
							<span className="text-red-500 text-sm">{errorMessage}</span>
						)}
					</div>
				</FormItem>
			);
		}}
	/>
);

const GenderFieldComponent: React.FC<{ control: Control<FormData> }> = ({
	control,
}) => (
	<FormField
		control={control}
		name="user_salutation"
		render={({ field }) => (
			<FormItem className="grid grid-cols-1 md:grid-cols-[1fr_3fr] md:items-center gap-1 md:gap-4 pb-4 md:pb-6">
				<FormLabel className="text-primary text-small md:text-base">
					Anrede
					<span className="text-red-500 ml-1">*</span>
				</FormLabel>
				<FormControl>
					<RadioGroup
						className="flex flex-row gap-4"
						defaultValue={"Herr"}
						onValueChange={field.onChange}
					>
						<div className="flex items-center gap-2">
							<RadioGroupItem value="Herr" />
							<label className="text-primary">Herr</label>
						</div>
						<div className="flex items-center gap-2">
							<RadioGroupItem value="Frau" />
							<label className="text-primary">Frau</label>
						</div>
					</RadioGroup>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default function UserInfoScreen() {
	const { data, setData, goToScreen } = useMaklerFunnel();
	const analytics = useRudderStackAnalytics();
	const [hasTracked, setHasTracked] = useState(false);
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (!hasTracked && data && data.data && analytics) {
			analytics?.track("Funnel Contact Page Viewed", data.data, {
				campaign: {
					gclid: data.data.gclid,
					gbraid: data.data.gbraid,
					wbraid: data.data.wbraid,
				},
			});

			setHasTracked(true);
		}
	}, [data, analytics, hasTracked]);

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			user_salutation: "Herr",
			user_firstname: "",
			user_lastname: "",
			user_email: "",
			user_phone: "",
		},
	});

	const onSubmit = async (formData: FormData) => {
		if (isSubmitting) return;
		setIsSubmitting(true);

		let SFData: any = null;
		const date_submitted = new Date();

		setPhoneError(null);
		try {
			const verfiedPhoneNumber = verifyPhoneNumberGoogle(formData.user_phone);

			if (!verfiedPhoneNumber.isValid) {
				analytics?.track(
					"Funnel Invalid Phone Number",
					{
						...formData,
						...data.data,
						user_phone: verfiedPhoneNumber.formatted,
						user_phone_is_valid: verfiedPhoneNumber.isValid,
						user_phone_is_possible: verfiedPhoneNumber.isPossible,
					},
					{
						campaign: {
							gclid: data.data.gclid,
							gbraid: data.data.gbraid,
							wbraid: data.data.wbraid,
						},
					},
				);
				setPhoneError("Telefonnummer ungültig.");
				setIsSubmitting(false);
				return;
			}

			setData((prevData) => ({
				...prevData,
				data: {
					...prevData.data,
					user_salutation: formData.user_salutation,
					user_firstname: capitalizeWords(formData.user_firstname),
					user_lastname: capitalizeWords(formData.user_lastname),
					user_email: formData.user_email,
					user_phone: verfiedPhoneNumber.formatted,
					date_submitted: date_submitted,
				},
			}));

			SFData = {
				...data.data,
				date_submitted: date_submitted,
				user_phone: verfiedPhoneNumber.formatted,
				user_salutation: formData.user_salutation,
				user_firstname: capitalizeWords(formData.user_firstname),
				user_lastname: capitalizeWords(formData.user_lastname),
				user_email: formData.user_email,
			};

			console.log(SFData);

			// Track consent given
			const consentHash = await computeConsentHash(CONSENT_CONFIG.consent_text);
			analytics?.track("Funnel Consent Given", {
				...data.data,
				consent_version: CONSENT_CONFIG.consent_version,
				consent_text_hash: consentHash,
				consent_method: CONSENT_CONFIG.consent_method,
				agb_version: CONSENT_CONFIG.agb_version,
				dse_version: CONSENT_CONFIG.dse_version,
				form_url: window.location.href,
				form_type: 'makler_funnel',
			}, {
				campaign: {
					gclid: data.data.gclid,
					gbraid: data.data.gbraid,
					wbraid: data.data.wbraid,
				}
			});

			analytics?.track(
				"Funnel Contact Submitted",
				{
					...data.data,
					...formData,
					user_phone: verfiedPhoneNumber.formatted,
				},
				{
					campaign: {
						gclid: data.data.gclid,
						gbraid: data.data.gbraid,
						wbraid: data.data.wbraid,
					},
				},
			);

			// Wait 500ms before navigating to next screen
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Navigate to screen 99 first so user sees loading screen immediately
			goToScreen(99);

			// Upload lead to database (happens in background)
			const uploadResult = await uploadLead(SFData);

			if (!uploadResult.success) {
				console.error(
					"Failed to upload lead to database:",
					uploadResult.errors.map((e) => e.error).join(", "),
				);
			} else {
				console.log(
					"Lead uploaded successfully:",
					uploadResult.salesforceLeadId,
				);
			}
		} catch (error) {
			console.error("Error during form submission:", error);
			console.log(SFData);
		} finally {
			setIsSubmitting(false);
		}
	};

	const heading = "Fast geschafft!";

	return (
		<>
			<div className="mb-6 w-full max-w-4xl mx-auto">
				<div className="mb-4">
					<StepsComponent currentStep={2} size="small" />
				</div>
				<h2 className="text-xl font-semibold text-primary md:text-2xl text-center">{heading}</h2>
				<div className="mt-2 hyphens-auto text-center text-base text-muted-foreground" lang="de">
					Bitte geben Sie Ihre Kontaktdaten ein, damit wir Ihnen die passenden Makler zuschicken können.
				</div>
			</div>
			<Form {...form}>
				<form
					className="flex h-full flex-col gap-2 w-full max-w-4xl mx-auto"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<GenderFieldComponent control={form.control} />
					<FormFieldComponent
						control={form.control}
						label="Vorname"
						name="user_firstname"
						placeholder="Max"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						label="Nachname"
						name="user_lastname"
						placeholder="Mustermann"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						label="E-Mail"
						name="user_email"
						placeholder="max.mustermann@gmail.com"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						customError={phoneError}
						label={
							<>
								Telefon (bei Rückfragen)
							</>
						}
						name="user_phone"
						onClearCustomError={() => setPhoneError(null)}
						placeholder="+49 176 123 456 78"
						required={true}
					/>
					<AgbText className="mt-2" />
					<div className="mt-4 flex flex-col items-center md:mt-8">
						<div className="w-full md:mb-4">
							<ButtonRenderer
								className="w-full h-10 md:h-12 text-base md:text-lg"
								disabled={isSubmitting}
								text="Makler-Empfehlung anfordern"
								type="submit"
							/>
						</div>
					</div>
					<div className="mx-auto mt-2">
						<Image
							alt="Logo Maklerauskunft Deutschland 2026 - Wide"
							src={iconLong}
							height={32}
						/>
					</div>
					<div className="mx-auto mt-2">
						<Trust />
					</div>
					<div className="mx-auto mt-4 text-center">
						<p className="text-gray-400 text-xs">
							Hinweis: Die Makler-Empfehlung ist kostenlos und unverbindlich.
						</p>
					</div>
				</form>
			</Form>
		</>
	);
}
