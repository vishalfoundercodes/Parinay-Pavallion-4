import { CheckCircle, Users } from 'lucide-react';
import React from 'react'
import Button from './Button';

interface CardItem {
  image: string;
  price: string | number;
  name?: string;
  type?: string;
  desc?: string;
  capacity?: number | string;
  amenities?: string[];
}

interface CardProps {
  item: CardItem;
  type?: string;
  onBook: (item: CardItem) => void;
}
// const Card = ({ item, type, onBook }) => 
// const Card: React.FC<CardProps> = ({ item, type, onBook }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
//     <div className="relative h-64 overflow-hidden">
//       <img
//         src={item.image || item.images[0].image}
//         alt={item.name || item.type}
//         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//       />
//       <div className="absolute top-4 right-4 bg-[#d4af37] text-[#0f3d2e] px-3 py-1 font-bold rounded-sm text-sm">
//         {item.price || item.base_price}
//       </div>
//     </div>
//     <div className="p-6">
//       <h3 className="text-xl font-serif font-bold text-[#0f3d2e] mb-2">
//         {item.name || item.type}
//       </h3>
//       {(item.desc||item.description) && (
//         <p className="text-gray-600 text-sm mb-4">
//           {item.desc || item.description}
//         </p>
//       )}

//       <div className="flex flex-wrap gap-2 mb-6">
//         {(item.capacity|| item.max_guests) && (
//           <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
//             <Users size={14} /> {item.capacity || item.max_guests}
//           </span>
//         )}
//         {item.amenities &&
//           item.amenities.map((am, idx) => (
//             <span
//               key={idx}
//               className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
//             >
//               <CheckCircle size={14} /> {am}
//             </span>
//           ))}
//       </div>

//       <Button
//         variant="dark"
//         className="w-full py-2"
//         onClick={() =>{console.log(item),console.log(onBook(item)), onBook(item)}}
//       >
//         Check Availability
//       </Button>
//     </div>
//   </div>
// );
// export default Card

const Card: React.FC<CardProps> = ({ item, type, onBook }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
    <div className="relative h-64 overflow-hidden">
      <img
        src={item.image || item.images[0].image}
        alt={item.name || item.type}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-4 right-4 bg-[#d4af37] text-[#0f3d2e] px-3 py-1 font-bold rounded-sm text-sm">
        {item.price || item.base_price}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-serif font-bold text-[#0f3d2e] mb-2">
        {item.name || item.type}
      </h3>
      {(item.desc || item.description) && (
        <p className="text-gray-600 text-sm mb-4">
          {item.desc || item.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {(item.capacity || item.max_guests) && (
          <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
            <Users size={14} /> {item.capacity || item.max_guests}
          </span>
        )}
        {item.amenities &&
          item.amenities.map((am, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
            >
              <CheckCircle size={14} /> {am}
            </span>
          ))}
      </div>

      <Button
        variant="dark"
        className="w-full py-2"
        onClick={() =>{console.log(item), onBook(item)}}  
      >
        Check Availability
      </Button>
    </div>
  </div>
);

export default Card;
