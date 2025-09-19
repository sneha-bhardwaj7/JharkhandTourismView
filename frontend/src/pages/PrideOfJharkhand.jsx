import React from 'react';
// import './PrideOfJharkhand.css'; // This file will be for any custom CSS

// Import images from the assets folder.
// Make sure these paths are correct for your project structure.
import mahendraDhoni from '../assets/mahendra-dhoni.png';
import deepikaKumari from '../assets/mahendra-dhoni.png';
import mangalChampia from '../assets/mahendra-dhoni.png';
import madhumitaKumari from '../assets/mahendra-dhoni.png';
import purnimaMahato from '../assets/mahendra-dhoni.png';
import birsaMunda from '../assets/mahendra-dhoni.png';
import sidoKanhu from '../assets/mahendra-dhoni.png';
import albertEkka from '../assets/mahendra-dhoni.png';
import arjunMunda from '../assets/mahendra-dhoni.png';
import balbirDutt from '../assets/mahendra-dhoni.png';
import jharkhandBackground from '../assets/mahendra-dhoni.png';

const prideData = [
  {
    category: 'Sports & Athletics',
    icon: '🏃‍♂️', // Updated icon
    people: [
      {
        name: 'Mahendra Singh Dhoni',
        description: 'Legendary Indian cricketer and former captain, born in Ranchi.',
        image: mahendraDhoni,
      },
      {
        name: 'Deepika Kumari',
        description: 'World-class archer, once ranked No. 1 globally.',
        image: deepikaKumari,
      },
      {
        name: 'Mangal Singh Champia',
        description: 'International medal-winning archer.',
        image: mangalChampia,
      },
      {
        name: 'Madhumita Kumari',
        description: 'Asian Games silver medalist in compound archery.',
        image: madhumitaKumari,
      },
      {
        name: 'Purnima Mahato',
        description: 'National archery champion and Commonwealth Games silver medalist.',
        image: purnimaMahato,
      },
    ],
  },
  {
    category: 'Freedom Fighters & Tribal Icons',
    icon: '✊', // Updated icon
    people: [
      {
        name: 'Birsa Munda',
        description: 'Revered tribal leader and freedom fighter; led the Ulgulan rebellion.',
        image: birsaMunda,
      },
      {
        name: 'Sido Murmu & Kanhu Murmu',
        description: 'Leaders of the Santal Rebellion against British rule.',
        image: sidoKanhu,
      },
      {
        name: 'Lance Naik Albert Ekka',
        description: 'Param Vir Chakra awardee for bravery in the 1971 Indo-Pak war.',
        image: albertEkka,
      },
    ],
  },
  {
    category: 'Public Figures & Leaders',
    icon: '👨‍💼', // Updated icon
    people: [
      {
        name: 'Arjun Munda',
        description: 'Union Minister of Tribal Affairs, born in Jamshedpur.',
        image: arjunMunda,
      },
      {
        name: 'Balbir Dutt',
        description: 'Veteran journalist and founder of Hindi daily Deshpran.',
        image: balbirDutt,
      },
    ],
  },
];

const PrideOfJharkhand = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${jharkhandBackground})` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-3xl shadow-3xl p-8 max-w-7xl mx-auto border border-yellow-500">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-green-700">
            Pride of Jharkhand
          </span>
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1.5 w-24 bg-gradient-to-r from-yellow-500 to-green-600 rounded-full"></span>
        </h1>

        <div className="space-y-16">
          {prideData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2">
                  {category.category}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.people.map((person, personIndex) => (
                  <div
                    key={personIndex}
                    className="relative bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 group"
                  >
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="p-4 relative">
                      <div className="absolute top-0 right-0 -mt-8 -mr-8 bg-yellow-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-xs font-bold shadow-lg transform rotate-45 transition-transform duration-500 ease-in-out group-hover:rotate-0 group-hover:scale-110">
                        Pride
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{person.name}</h3>
                      <p className="text-gray-600 text-sm">{person.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrideOfJharkhand;