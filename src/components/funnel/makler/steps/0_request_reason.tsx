"use client";

import { Building, Check, HandCoins, Home, Key } from "lucide-react";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import StepsComponent from "@/components/funnel/steps-component";
import { generateTransactionNumber } from "@/components/utils/generateTransactionNumber";
import getGAUserId from "@/components/utils/getGAUserId";
import { storage } from "@/lib/storage";
import { FunnelButtonLarge } from "../makler-funnel-button";
import { useMaklerFunnel } from "../makler-funnel-context";
import type { DataArrayItem } from "../makler-types";

function MicroTrust() {
  const items = ["100% kostenlos", "Keine Anmeldung", "Unverbindlich"];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-1.5 text-sm text-white/60">
          <Check className="size-4 text-emerald-400" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function RequestReasonScreen({
  cityName,
  locationName,
}: {
  cityName?: string;
  locationName?: string;
}) {
  const { setData, data, goToScreen } = useMaklerFunnel();
  const [stateUrl, setStateUrl] = useState<string | null>(null);
  const [cityUrl, setCityUrl] = useState<string | null>(null);
  const [districtUrl, setDistrictUrl] = useState<string | null>(null);
  const [firstPageVisited, setFirstPageVisited] = useState<string | null>(null);
  const analytics = useRudderStackAnalytics();
  const utmUrl = usePathname();

  useEffect(() => {
    // Only fetch the URL values after a delay
    const timer = setTimeout(() => {
      setStateUrl(storage.get("stateUrl"));
      setCityUrl(storage.get("cityUrl"));
      setDistrictUrl(storage.get("districtUrl"));
      setFirstPageVisited(storage.get("firstPageVisited"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const nextScreen = 1; // Go to property type
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const heading = "Für welches Anliegen suchen Sie einen Makler?";

  // Database values per plan:
  // Verkaufen: intention_request_reason = "Immobilienverkauf"
  // Kaufen: intention_request_reason = "Immobilienkauf"
  // Vermieten: intention_request_reason = "Anderer Zweck", intention_request_reason_detail = "Vermieten"
  // Mieten: intention_request_reason = "Anderer Zweck", intention_request_reason_detail = "Mieten"
  const multipleChoiceData: (DataArrayItem & {
    dbValue: string;
    dbValueDetail?: string;
  })[] = [
      {
        name: "Verkaufen",
        icon: <HandCoins />,
        nextScreen: nextScreen,
        value: "Verkaufen",
        dbValue: "Immobilienverkauf",
      },
      {
        name: "Kaufen",
        icon: <Key />,
        nextScreen: 5, // Service not available screen
        value: "Kaufen",
        dbValue: "Immobilienkauf",
        dbValueDetail: "Kaufen",
      },
      {
        name: "Vermieten",
        icon: <Building />,
        nextScreen: 5, // Service not available screen
        value: "Vermieten",
        dbValue: "Anderer Zweck",
        dbValueDetail: "Vermieten",
      },
      {
        name: "Mieten",
        icon: <Home />,
        nextScreen: 5, // Service not available screen
        value: "Mieten",
        dbValue: "Anderer Zweck",
        dbValueDetail: "Mieten",
      },
    ];

  const handleSubmit = (item: (typeof multipleChoiceData)[0]) => {
    // Fallback to current pathname if FirstPageTracker hasn't set the value yet (race condition)
    const firstPage = firstPageVisited ?? utmUrl;

    const trackingData = {
      ...data.data,
      intention_request_reason: item.dbValue,
      intention_request_reason_detail: item.dbValueDetail ?? null,
      track_page_funnel_submitted: utmUrl,
      track_ga_user_id: getGAUserId(),
      track_rs_anonymous_id: analytics?.getAnonymousId(),
      track_rs_session_id: analytics?.getSessionId(),
      track_url_state: stateUrl !== "" ? stateUrl : null,
      track_url_city: cityUrl !== "" ? cityUrl : null,
      track_url_district: districtUrl !== "" ? districtUrl : null,
      track_page_first_visit: firstPage,
      track_funnel_started_at: new Date(),
      property_city: cityName ?? null,
      int_process_number: generateTransactionNumber(),
    };

    // set the data
    setData((prevData) => ({
      ...prevData,
      data: trackingData,
    }));

    // fire analytics events
    analytics?.track("Funnel Started", trackingData, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      },
    });

    goToScreen(item.nextScreen);
  };

  return (
    <div className="flex flex-col items-center p-2 md:p-4 w-full max-w-4xl mx-auto">
      {/* Step Preview */}
{/* 
      <StepsComponent
        currentStep={1}
        showAllLabels
        allFilled
      /> */}

      {/* Header */}
      <div className="mb-8 w-full max-w-3xl text-center">
        <div className="font-display text-2xl font-bold text-white md:text-3xl">{heading}</div>
      </div>

      {/* Request Reason Buttons */}
      <div className="mb-6 grid w-full max-w-3xl grid-cols-2 gap-4">
        {multipleChoiceData.map((item, index) => (
          <FunnelButtonLarge
            index={index}
            isHover={hoverIndex === index}
            item={item}
            key={index}
            onclick={() => handleSubmit(item)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          />
        ))}
      </div>

      {/* Trust Badges */}
      <div className="funnel-micro-trust">
        <MicroTrust />
      </div>
    </div>
  );
}
