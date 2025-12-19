// import React from 'react'
// import SectionTitle from '../ReusableComponent/Section';
// import Card from '../ReusableComponent/Card';
// interface VenueItem {
//   id: string | number;
//   name?: string;
//   type?: string;
//   image: string;
//   price: string;
//   desc?: string;
//   capacity?: string;
//   amenities?: string[];
// }
// interface VenuesPageProps {
//   type: "lawns" | "halls" | "rooms";
//   data: VenueItem[];
//   onBook: (item: VenueItem) => void;
// }

// const VenuesPage:React.FC<VenuesPageProps> = ({ type, data, onBook }) => (
//   <div className="py-24 px-4 max-w-7xl mx-auto animate-fade-in">
//     <SectionTitle
//       title={
//         type === "lawns"
//           ? "Our Wedding Lawns"
//           : type === "halls"
//           ? "Banquet Halls"
//           : "Luxury Rooms"
//       }
//       subtitle="Explore Options"
//     />
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {data.map((item) => (
//         <Card key={item.id} item={item} type={type} onBook={onBook} />
//       ))}
//     </div>
//   </div>
// );

// export default VenuesPage;

import React from "react";
import SectionTitle from "../ReusableComponent/Section";
import Card from "../ReusableComponent/Card";

interface CardItem {
  id: string | number;
  image: string;
  price: string | number;
  name?: string;
  type?: string;
  desc?: string;
  capacity?: number | string;
  amenities?: string[];
}

interface VenuesPageProps {
  type: "lawns" | "halls" | "rooms";
  data: CardItem[];
  onBook: (item: CardItem) => void;
}

const VenuesPage: React.FC<VenuesPageProps> = ({ type, data, onBook }) => {
  return (
    <div className="py-24 px-4 max-w-7xl mx-auto animate-fade-in">
      <SectionTitle
        title={
          type === "lawns"
            ? "Our Wedding Lawns"
            : type === "halls"
            ? "Banquet Halls"
            : "Luxury Rooms"
        }
        subtitle="Explore Options"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <Card key={item.id} item={item} type={type} onBook={()=>onBook} />
        ))}
      </div>
    </div>
  );
};

export default VenuesPage;
