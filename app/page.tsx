import { RajDelightExperienceV10 } from '@/components/RajDelightExperienceV10Real';

const premiumEnhancementCSS = `
/* Premium mobile menu: keep the existing MENU control, remove the cheap hamburger treatment. */
@media (max-width: 720px) {
  button[aria-label="Open navigation"] {
    display: inline-flex !important;
    width: auto !important;
    min-width: 84px !important;
    min-height: 42px !important;
    padding: 0 18px !important;
    font-size: 9px !important;
    letter-spacing: .12em !important;
    border-color: color-mix(in srgb, var(--gold) 26%, var(--line)) !important;
    box-shadow: 0 8px 24px rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,.5) !important;
  }
  button[aria-label="Open navigation"]::before { content: none !important; }
}

/* Exact requested vegetarian category imagery. Only these seven cards are overridden. */
.cuisineGrid > button:nth-child(8) > img {
  content: url("https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_600%2Ch_468/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2026/6/10/f7db7fb2-3c52-4dae-8b9e-f208614d360a_Manch34718FOODSHOTS3e128f6449b344835ad481d7d963bc3db.JPG") !important;
  opacity: 1 !important;
}
.cuisineGrid > button:nth-child(11) > img {
  content: url("https://www.mymasalabox.in/wp-content/uploads/2021/01/Boondi-raita1.jpg") !important;
  opacity: 1 !important;
}
.cuisineGrid > button:nth-child(14) > img {
  content: url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_300%2Ch_300%2Cc_fit/FOOD_CATALOG/IMAGES/CMS/2026/1/19/28fb48f9-fe87-447c-b623-f5f9cfcd8b48_2e142958-9ab1-44c0-a89d-f1d0b0f4624e.jpg") !important;
  opacity: 1 !important;
}
.cuisineGrid > button:nth-child(15) > img {
  content: url("https://image.cdn.shpy.in/474920/ee2c29fa-8d7b-4db8-bad4-ab8726edfdbf-1778783742455.png?format=webp") !important;
  opacity: 1 !important;
}
.cuisineGrid > button:nth-child(22) > img {
  content: url("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_400/FOOD_CATALOG/IMAGES/CMS/2025/9/17/e4dd1ab7-81a3-4c78-ac46-05adb93fd7fa_df1df57b-de12-4083-8ea0-e8c9956785d5.png") !important;
  opacity: 1 !important;
}
.cuisineGrid > button:nth-child(32) > img {
  content: url("https://static.toiimg.com/thumb/116805722/116805722.jpg?height=746&imgsize=119040&resizemode=76&width=420") !important;
  opacity: 1 !important;
}
.cuisineGrid > button:nth-child(33) > img {
  content: url("https://images.healthshots.com/healthshots/en/uploads/2022/09/26103400/navratri-fasting-1600x900.jpg") !important;
  opacity: 1 !important;
}

/* Lively but restrained scroll motion: the same sections animate naturally on downward and upward scroll. */
[data-reveal] {
  animation-name: rdScrollReveal !important;
  animation-duration: 900ms !important;
  animation-timing-function: cubic-bezier(.2,.7,.2,1) !important;
  animation-fill-mode: both !important;
  animation-timeline: view() !important;
  animation-range: entry 4% cover 32% !important;
}
@keyframes rdScrollReveal {
  from {
    opacity: .12;
    transform: translateY(24px) scale(.992);
    filter: blur(1.5px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}

/* The supplied Raj Delight logo is already stored in the repo at this exact filename. */
.brand img[src="/raj-delight-mark.svg"],
.footerBrand img[src="/raj-delight-mark.svg"] {
  content: url("/grok_1789624913553.jpg") !important;
  object-fit: contain !important;
  transform: scale(1.08);
}
.brand img[src="/raj-delight-mark.svg"] { width: 48px !important; height: 48px !important; }
.footerBrand img[src="/raj-delight-mark.svg"] { width: 42px !important; height: 42px !important; }
`;

export default function Page() {
  return (
    <>
      <RajDelightExperienceV10 />
      <style dangerouslySetInnerHTML={{ __html: premiumEnhancementCSS }} />
    </>
  );
}
