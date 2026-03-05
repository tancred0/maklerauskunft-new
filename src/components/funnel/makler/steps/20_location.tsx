import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type Control, type UseFormSetValue, useForm } from "react-hook-form";
import { z } from "zod";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import parseAddress, {
	type ParsedAddressType,
} from "@/components/utils/parseGoogleAdress";
import StepsComponent from "../../steps-component";
import { useMaklerFunnel } from "../makler-funnel-context";
import { BackAndForthNew } from "../makler-navigation";

const schema = z.object({
	property_address_confirmed: z.boolean(),
	property_street: z
		.string()
		.min(1, "Bitte Straße eingeben")
		.max(39, "Bitte nur den Straßennamen eingeben"),
	property_house_number: z
		.string()
		.min(1, "Bitte Hausnummer eingeben")
		.max(10, "Bitte nur die Hausnummer eingeben"),
	property_postalcode: z
		.string()
		.min(1, "Bitte Postleitzahl eingeben")
		.regex(/^\d{5}$/, "Postleitzahl muss 5-stellig sein"),
	property_city: z
		.string()
		.min(1, "Bitte Stadt eingeben")
		.max(39, "Bitte nur Stadtnamen eingeben"),
	property_state: z.string(),
	property_country: z.string(),
	property_latitude: z.number(),
	property_longitude: z.number(),
});

type FormData = z.infer<typeof schema>;

interface FormFieldComponentProps {
	name: Exclude<keyof FormData, "property_address_confirmed">;
	label: string;
	placeholder: string;
	control: Control<FormData>;
	required?: boolean;
}

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
	name,
	label,
	placeholder,
	control,
	required = false,
}) => (
	<FormField
		control={control}
		name={name}
		render={({ field, fieldState }) => (
			<FormItem className="grid grid-cols-1 md:grid-cols-[1fr_3fr] md:items-center gap-1 md:gap-4 mb-4 md:mb-6">
				<FormLabel
					className="text-white/80 text-small md:text-base"
					htmlFor={name}
				>
					{label}
					{required && <span className="text-red-400 ml-1">*</span>}
				</FormLabel>
				<div className="flex flex-col gap-1">
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							className={
								fieldState.error
									? "h-10 border-2 border-red-400 bg-white/[0.1] text-white placeholder:text-white/40 md:h-12"
									: "h-10 border-white/[0.15] bg-white/[0.1] text-white placeholder:text-white/40 md:h-12"
							}
						/>
					</FormControl>
					{fieldState.error && (
						<span className="text-red-400 text-sm">{fieldState.error.message}</span>
					)}
				</div>
			</FormItem>
		)}
	/>
);

const setFormValues = (
	parsedAddress: ParsedAddressType,
	setValue: UseFormSetValue<FormData>,
) => {
	const {
		streetName,
		houseNumber,
		state,
		postalCode,
		city,
		latitude,
		longitude,
		country,
	} = parsedAddress;

	if (streetName == "" || houseNumber == "") {
		setValue("property_address_confirmed", false);
	}
	if (streetName !== "") {
		setValue("property_street", streetName);
	}
	if (houseNumber !== "") {
		setValue("property_house_number", houseNumber);
	}
	if (postalCode.length === 5) {
		setValue("property_postalcode", postalCode);
	}

	setValue("property_city", city);
	setValue("property_state", state);
	setValue("property_latitude", latitude ?? 0);
	setValue("property_longitude", longitude ?? 0);
	setValue("property_country", country);
};

const geocodeAddress = async (
	formData: FormData,
): Promise<ParsedAddressType | null> => {
	const apiAddress = `${formData.property_street} ${formData.property_house_number}, ${formData.property_postalcode} ${formData.property_city}, GERMANY`;
	const geocoder = new google.maps.Geocoder();

	return new Promise((resolve) => {
		geocoder.geocode({ address: apiAddress }, (results, status) => {
			if (status === "OK" && results && results[0]) {
				const result = results[0];
				const parsedAddress = parseAddress(
					result.address_components as unknown as { long_name: string; short_name: string; types: string[] }[],
					result.geometry as unknown as { location: { lat: () => number; lng: () => number } },
				);
				resolve(parsedAddress);
			} else {
				resolve(null);
			}
		});
	});
};

export default function LocationScreen() {
	const { goToScreen, data, setData } = useMaklerFunnel();
	const analytics = useRudderStackAnalytics();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			property_address_confirmed: true,
			property_street: data.data.property_street || "",
			property_house_number: data.data.property_house_number || "",
			property_postalcode: data.data.property_postalcode || "",
			property_city: data.data.property_city || "",
			property_state: data.data.property_state || "",
			property_country: data.data.property_country || "",
			property_latitude: data.data.property_latitude || 0,
			property_longitude: data.data.property_longitude || 0,
		},
		mode: "onSubmit",
	});

	const onSubmit = async (formData: FormData) => {
		setIsSubmitting(true);
		let finalFormData = { ...formData };

		const geocodedAddress = await geocodeAddress(formData);
		if (geocodedAddress) {
			setFormValues(geocodedAddress, form.setValue);
			finalFormData = { ...form.getValues() };
		} else {
			setIsSubmitting(false);
			return;
		}

		setData((prevData) => ({
			...prevData,
			data: {
				...prevData.data,
				...finalFormData,
				property_street_and_number: `${finalFormData.property_street} ${finalFormData.property_house_number}`,
			},
		}));

		analytics?.track("Funnel Location Submitted", {
			...data.data,
			...finalFormData,
		}, {
			campaign: {
				gclid: data.data.gclid,
				gbraid: data.data.gbraid,
				wbraid: data.data.wbraid,
			},
		});

		setIsSubmitting(false);
		goToScreen(97); // Go to loader
	};

	const heading = "Wo befindet sich die Immobilie?";

	return (
		<>
			<div className="mb-4 space-y-4 md:mb-10 w-full max-w-4xl mx-auto">
				<StepsComponent currentStep={1} />
				<h2 className="text-center font-display text-xl font-bold text-white md:text-2xl">{heading}</h2>
			</div>
			<Form {...form}>
				<form
					className="flex h-full flex-col w-full max-w-4xl mx-auto"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormFieldComponent
						control={form.control}
						label="Straße"
						name="property_street"
						placeholder="Friedrichstraße"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						label="Hausnummer"
						name="property_house_number"
						placeholder="158"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						label="PLZ"
						name="property_postalcode"
						placeholder="10117"
						required={true}
					/>
					<FormFieldComponent
						control={form.control}
						label="Stadt"
						name="property_city"
						placeholder="Berlin"
						required={true}
					/>
					<div className="mt-auto">
						<BackAndForthNew disabled={isSubmitting} />
					</div>
				</form>
			</Form>
		</>
	);
}
