import ringIcon from "../assets/icon/ringIcon.jpg";
import earringIcon from "../assets/icon/EarringIconImage.jpg";
import necklaceIcon from "../assets/icon/Necklace-Icon.png";
import PendantIcon from "../assets/icon/pendant-icon.jpg";
import braceletIcon from "../assets/icon/bracelet-Icon.png";
import WatchIcon from "../assets/icon/vintage-icon.jpg";

import rings from "../assets/Collections/rings.jpg";
import earrings from "../assets/Collections/earrings.jpg";
import necklaces from "../assets/Collections/necklace.jpg";
import pendants from "../assets/Collections/pendants.jpg";
import bracelets from "../assets/Collections/bracelet.jpg";
import kashmiriWatch from "../assets/Collections/kashmiri-watch.jpg";
import vintageWatch from "../assets/Collections/vintage-watch.jpg";

const categories = [
  {
  id: 1,
  name: "Rings",
  slug: "rings",
  image: rings,
  icon: ringIcon,
},
  {
    id: 2,
    name: "Earrings",
    image: earrings,
    icon: earringIcon,
  },
  {
    id: 3,
    name: "Necklaces",
    image: necklaces,
    icon: necklaceIcon,
  },
  {
    id: 4,
    name: "Pendants",
    image: pendants,
    icon: PendantIcon,
  },
  {
    id: 5,
    name: "Bracelets",
    image: bracelets,
    icon: braceletIcon,
  },
  {
    id: 6,
    name: "Watches",
    image: kashmiriWatch,
    icon: WatchIcon,
  }
];

export default categories;