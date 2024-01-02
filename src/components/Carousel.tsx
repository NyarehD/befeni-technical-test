import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ApiDataProps } from "../types/ApiDataProps";

const responsive: ResponsiveType = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export default function FabricCarousel({ images }: { images?: ApiDataProps["fabricImages"] }) {
  return (
    <Carousel responsive={responsive} showDots className="max-h-80 max-w-full border border-black" >
      {images?.map((image, index) => (
        <div className=" size-full object-contain max-h-80" key={`${image.fabric_id}${index}`}>
          <img src={image.image_url} alt={image.type} className="size-full object-contain" />
        </div>
      ))}
    </Carousel>
  )
}