export default function useAssets() {
  const svgs = import.meta.globEager("/src/assets/*.svg");
  const pngs = import.meta.globEager("/src/assets/*.png");
  const jpegs = import.meta.globEager("/src/assets/*.jpeg");

  return {
    carIcon: svgs["/assets/car-icon.svg"].default,
    partsIcon: svgs["/assets/parts-icon.svg"].default,
  };
}
