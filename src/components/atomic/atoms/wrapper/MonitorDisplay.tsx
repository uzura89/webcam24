export function MonitorDisplay(props: { children: React.ReactNode }) {
  return (
    <div className="rounded-md overflow-hidden border-[2px] border-neutral-950 bg-gradient-to-b from-[#33333d] to-[#252531] p-[1px] h-full">
      <div className="bg-[#1b1b25] rounded-[4px] h-full">{props.children}</div>
    </div>
  );
}
// export function MonitorDisplay(props: { children: React.ReactNode }) {
//   return (
//     <div className="rounded-md overflow-hidden border-[2px] border-neutral-950 bg-gradient-to-b from-[#36424c] to-[#202427] p-[1px] h-full">
//       <div className="bg-[#0d1822] rounded-[4px] h-full">{props.children}</div>
//     </div>
//   );
// }

export function MonitorDisplayInPrimaryButton(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-full overflow-hidden border-[1px] border-[#492020] bg-gradient-to-b from-[#af7b6c] to-[#7d554a] p-[1px] h-full">
      <div className="bg-[#9b6656] rounded-full h-full">{props.children}</div>
    </div>
  );
}

// export function MonitorDisplayRound(props: { children: React.ReactNode }) {
//   return (
//     <div className="rounded-full overflow-hidden border-[1px] border-[#492020] bg-gradient-to-b from-[#293e5c] to-[#3d3e40] p-[1px] h-full">
//       <div className="bg-[#232b35] rounded-full h-full">{props.children}</div>
//     </div>
//   );
// }
