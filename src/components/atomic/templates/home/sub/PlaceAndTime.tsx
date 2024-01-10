import { getCurrentTimeWithOffset } from "@/modules/utils/datetime/getCurrentTimeWithOffset";
import { useRef, useState, useEffect } from "react";

export function PlaceAndTime(props: {
  addressSpot: string;
  addressRegion: string;
  addressCountry: string;
  gmtOffset: number;
}) {
  return (
    <div className="w-full flex-col items-center justify-between px-5 py-3">
      <div className="text-3xl font-black mb-1 text-blue-50/95 flex items-center whitespace-nowrap overflow-hidden">
        <div className="max-w-1">{props.addressSpot}</div>
      </div>
      <div className="flex items-center justify-between w-full">
        {/* Region and country */}
        <div>
          <div className="text-sm font-bold opacity-100 ">
            {props.addressRegion}
          </div>
          <div className="text-sm font-bold opacity-100 ">
            {props.addressCountry}
          </div>
        </div>
        <TimeBar gmtOffset={props.gmtOffset} />
      </div>
    </div>
  );
}

function TimeBar(props: { gmtOffset: number }) {
  const gmtOffsetOfHere = (new Date().getTimezoneOffset() / 60) * -1;

  return (
    <div className="flex gap-1 items-center">
      {/* There */}
      <div>
        <div className="text-xs font-bold tracking-wide text-[#878d91]">
          TIME
        </div>
        <div className="text-sm font-extrabold min-w-[3.4rem]">
          <TimeString gmtOffset={props.gmtOffset} />
        </div>
      </div>

      {/* Here */}
      <div>
        <div className="text-xs font-bold tracking-wide text-[#878d91]">
          HERE
        </div>
        <div className="text-sm font-extrabold">
          <TimeString gmtOffset={gmtOffsetOfHere} />
        </div>
      </div>
    </div>
  );
}

function TimeString(props: { gmtOffset: number }) {
  // refs
  const intervalRef = useRef<any>(0);
  // local state
  const [hourString, setHourString] = useState("00");
  const [minString, setMinString] = useState("00");

  function updateTimeString() {
    const { hours, minutes } = getCurrentTimeWithOffset(props.gmtOffset);

    setHourString(hours.toString().padStart(2, "0"));
    setMinString(minutes.toString().padStart(2, "0"));
  }

  useEffect(() => {
    if (props.gmtOffset === undefined) return;

    updateTimeString();
    intervalRef.current = setInterval(() => {
      updateTimeString();
    }, 1000 * 60);

    return () => clearInterval(intervalRef.current);
  }, [props.gmtOffset]);

  return (
    <div className="">
      {hourString}
      <span>:</span>
      {minString}
    </div>
  );
}
