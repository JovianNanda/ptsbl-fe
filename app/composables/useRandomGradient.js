export const useRandomGradient = () => {
  const gradients = [
    "from-[#FF6B6B] to-[#FFD93D]",
    "from-[#00D4FF] to-[#0078FF]",
    "from-[#FF7EE5] to-[#915EFF]",
    "from-[#FF9966] to-[#FF5E62]",
    "from-[#1CECCC] to-[#0078AA]",
    "from-[#FCE38A] to-[#F38181]",
    "from-[#6A11CB] to-[#2575FC]",
    "from-[#00F5A0] to-[#00D9F5]",
    "from-[#FAD961] to-[#F76B1C]",
    "from-[#C471ED] to-[#F64F59]",
    "from-[#12C2E9] to-[#C471ED]",
    "from-[#F093FB] to-[#F5576C]",
    "from-[#43E97B] to-[#38F9D7]",
    "from-[#30CFD0] to-[#330867]",
    "from-[#FF5F6D] to-[#FFC371]",
  ];

  const getRandomGradient = () => {
    const index = Math.floor(Math.random() * gradients.length);
    return gradients[index];
  };

  return { getRandomGradient };
};
