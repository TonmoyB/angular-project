import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  menProducts = [
    {
      id: "1",
      name: 'Souls Diamond',
      price: 185.00,
      image: '../../../assets/men/Symphony Of Souls Diamond Engagement Ring For Men.png',
      type: 'ring'
    },
    {
      id: "2",
      name: 'Contemporary Matte',
      price: 210.00,
      image: '../../../assets/men/Contemporary Matte Finger Ring.png',
      type: 'ring'
    },
    {
      id: "3",
      name: 'Divine Pavanputra',
      price: 120.00,
      image: '../../../assets/men/Divine Pavanputra Pendant.png',
      type: 'pendant'
    },
    {
      id: '4',
      name: 'Dynamic Edge',
      price: 99.00,
      image: '../../../assets/men/Dynamic Edge Finger Ring.png',
      type: 'ring'
    },
    {
      id: "5",
      name: 'Elegant Criss Cross',
      price: 120.00,
      image: '../../../assets/men/Elegant Criss Cross Gold Chain.png',
      type: 'chain'
    },
    {
      id: '6',
      name: 'Elegant Gold Chain',
      price: 99.00,
      image: '../../../assets/men/Elegant Gold Chain.png',
      type: 'chain'
    },
    {
      id: "7",
      name: 'Grided Glitz',
      price: 120.00,
      image: '../../../assets/men/Grided Glitz Gold & Diamond.png',
      type: 'ring'
    },
    {
      id: '8',
      name: 'Lumos Diamond Ring',
      price: 99.00,
      image: '../../../assets/men/Lumos Diamond Ring.png',
      type: 'ring'
    },
    {
      id: "9",
      name: `Luxurious Mens' Chain`,
      price: 185.00,
      image: `../../../assets/men/Luxurious Men's Gold Chain.png`,
      type: 'chain'
    },
    {
      id: "10",
      name: `Maze Mens' Gold Ring`,
      price: 210.00,
      image: `../../../assets/men/Maze Men's Gold Finger Ring.png`,
      type: 'ring'
    },
    {
      id: "11",
      name: 'Minimalistic Mesmerising',
      price: 120.00,
      image: '../../../assets/men/Minimalistic Mesmerising.png',
      type: 'ring'
    },
    {
      id: '12',
      name: 'Minimalistic Platimun',
      price: 99.00,
      image: '../../../assets/men/Minimalistic Platinum Finger Ring.png',
      type: 'ring'
    },
    {
      id: "13",
      name: `Sculpted Mens' Gold Ring`,
      price: 120.00,
      image: `../../../assets/men/Sculpted Men's Gold Finger Ring.png`,
      type: 'ring'
    },
    {
      id: '14',
      name: 'Sleek Platinum Chain',
      price: 99.00,
      image: '../../../assets/men/Sleek Platinum Chain.png',
      type: 'chain'
    },
    {
      id: "15",
      name: `Structured Mens'`,
      price: 120.00,
      image: '../../../assets/men/Structured Mens Diamond Finger Ring.png',
      type: 'ring'
    },
    {
      id: '16',
      name: 'Stunning Geometric',
      price: 99.00,
      image: '../../../assets/men/Stunning Geometric Gold Ring for Men.png',
      type: 'ring'
    },
    {
      id: '17',
      name: 'Timeless Statement',
      price: 99.00,
      image: '../../../assets/men/Timeless Statement Gold Chain.png',
      type: 'chain'
    },
    {
      id: '18',
      name: 'Rudraksh Bracelet',
      price: 99.00,
      image: '../../../assets/men/Unique Om Rudraksh Bracelet.png',
      type: 'bracelet'
    }
  ];

  womenProducts = [
    {
      id: "1",
      name: "Alluring Gold Beaded",
      price: 220.00,
      image: "../../../assets/women/Alluring 22 Karat Gold Beaded Finger Ring.png",
      type: "ring"
    },
    {
      id: "2",
      name: "Bloomy Affair Pendant",
      price: 180.00,
      image: "../../../assets/women/Bloomy Affair Pendant.png",
      type: "pendant"
    },
    {
      id: "3",
      name: 'Captivating Grace Drop',
      price: 120.00,
      image: '../../../assets/women/Captivating Grace Drop.png',
      type: 'earrings'
    },
    {
      id: '4',
      name: 'Dazzling Allure',
      price: 99.00,
      image: '../../../assets/women/Dazzling Allure Diamond Ring.png',
      type: 'ring'
    },
    {
      id: "5",
      name: "Ethereal Infusion",
      price: 220.00,
      image: "../../../assets/women/Ethereal Infusion.png",
      type: "pendant"
    },
    {
      id: "6",
      name: "Shimmering Wavy",
      price: 380.00,
      image: "../../../assets/women/Shimmering Wavy Diamond Finger Ring.png",
      type: "ring"
    },
    {
      id: "7",
      name: 'Simple Gold Chain',
      price: 120.00,
      image: '../../../assets/women/Simple Gold Chain.png',
      type: 'chain'
    },
    {
      id: '8',
      name: 'Starry Dual Tone',
      price: 99.00,
      image: '../../../assets/women/Starry Dual Tone.png',
      type: 'earrings'
    },
    {
      id: '9',
      name: 'Stunning Gold Chain',
      price: 399.00,
      image: '../../../assets/women/Stunning Gold Chain.png',
      type: 'chain'
    }
  ];

  allProducts = this.menProducts.concat(this.womenProducts);

  search(query: string): Promise<any[]> {
    const mockResults = this.allProducts;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          mockResults.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      }, 500);
    });
  }

}
