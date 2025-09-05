


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
        <div className="logos-slide certificates">
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
  { name: "ABB", image: "/logo_partner/logo1.png" },
  { name: "WARSONCO", image: "/logo_partner/logo2.png" },
  { name: "RECHU", image: "/logo_partner/logo3.png" },
  { name: "TMA", image: "/logo_partner/logo4.png" },
  { name: "OPT", image: "/logo_partner/logo5.png" },
  { name: "KUKA", image: "/logo_partner/logo6.png" },
  { name: "IRAYPLE", image: "/logo_partner/logo7.png" },
];

// Data cho chứng nhận
const certificates: Item[] = [
  { name: "WARSONCO", image: "/logo_partner/certificate1.png" },
  { name: "IRAYPLE", image: "/logo_partner/certificate2.png" },
  { name: "BOT", image: "/logo_partner/certificate3.png" },
  { name: "ISO 14064", image: "/logo_partner/certificate4.png" },
  { name: "ISO 14065", image: "/logo_partner/certificate5.png" },
];

// Export component chính
import { useTranslation } from 'react-i18next';

export default function CarouselsDemo() {
  const { t } = useTranslation();
  return (
    <div>
      <Carousel items={logos} title={t('logo_carousel.partners')} />
      <Carousel items={certificates} title={t('logo_carousel.certificates')} />
    </div>
  );
}
