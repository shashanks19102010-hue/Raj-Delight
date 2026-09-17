import { RajDelightExperienceV10 } from '@/components/RajDelightExperienceV10Real';

const hamburgerCSS = `
button[aria-label="Open navigation"] {
  font-size: 0 !important;
  width: 42px;
  padding: 0 !important;
}
button[aria-label="Open navigation"]::before {
  content: "";
  width: 18px;
  height: 1.5px;
  display: block;
  background: currentColor;
  box-shadow: 0 5px 0 currentColor, 0 10px 0 currentColor;
}
`;

export default function Page() {
  return (
    <>
      <RajDelightExperienceV10 />
      <style dangerouslySetInnerHTML={{ __html: hamburgerCSS }} />
    </>
  );
}
