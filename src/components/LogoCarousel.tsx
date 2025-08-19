
import logo1 from "../logo_partner/logo1.png";
import logo2 from "../logo_partner/logo2.png";
import logo3 from "../logo_partner/logo3.png";
import logo4 from "../logo_partner/logo4.png";
import logo5 from "../logo_partner/logo5.png";
import logo6 from "../logo_partner/logo6.png";
import logo7 from "../logo_partner/logo7.png";

import certificate1 from "../logo_partner/certificate1.png";
import certificate2 from "../logo_partner/certificate2.png";
import certificate3 from "../logo_partner/certificate3.png";
import certificate4 from "../logo_partner/certificate4.png";
import certificate5 from "../logo_partner/certificate5.png";

type Item = {
  name: string;
  image: string;
};

interface CarouselProps {
  items: Item[];
  title?: string;
}

function Carousel({ items, title }: CarouselProps) {
  return (
    <div className="carousel">
      {title && <h2>{title}</h2>}
      <div className="logos">
        <div className="logos-slide">
          {items.map((item) => (
            <img key={`a-${item.name}`} src={item.image} alt={item.name} />
          ))}
        </div>
        <div className="logos-slide">
          {items.map((item) => (
            <img key={`b-${item.name}`} src={item.image} alt={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Data cho logo
const logos: Item[] = [
  { name: "ABB", image: logo1 },
  { name: "WARSONCO", image: logo2 },
  { name: "RECHU", image: logo3 },
  { name: "TMA", image: logo4 },
  { name: "OPT", image: logo5 },
  { name: "KUKA", image: logo6 },
  { name: "IRAYPLE", image: logo7 },
];

// Data cho chứng nhận
const certificates: Item[] = [
  { name: "WARSONCO", image: certificate1 },
  { name: "IRAYPLE", image: certificate2 },
  { name: "BOT", image: certificate3 },
  { name: "ISO 14064", image: certificate4 },
  { name: "ISO 14065", image: certificate5 },
];

// Export component chính
export default function CarouselsDemo() {
  return (
    <div>
      <Carousel items={logos} title="Đối tác" />
      <Carousel items={certificates} title="Chứng nhận" />
    </div>
  );
}
