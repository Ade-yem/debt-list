type Cards = {
    _id?: string;
    name: string;
    amount: number;
    date: string;
    amount_paid: number;
    paid: boolean;
    written_by?: string;
    comment?: string;
    editing?: boolean;
  };

  type Price = {
    _id?: string;
    name: string;
    variation: string; // whether big size or small size or medium
    bulk_price: number;
    unit_price: number;
  }

export const cardsList: Cards[] = [
    {
      name: 'Alice',
      amount: 1000,
      date: '2023-11-20',
      amount_paid: 500,
      paid: true,
      written_by: 'John Doe',
      comment: 'Paid half of the amount',
      editing: false,
    },
    {
      name: 'Bob',
      amount: 800,
      date: '2023-11-21',
      amount_paid: 300,
      paid: false,
      written_by: 'Jane Doe',
      comment: 'Yet to make a payment',
      editing: false,
    },
    {
      name: 'Charlie',
      amount: 1200,
      date: '2023-11-22',
      amount_paid: 800,
      paid: true,
      written_by: 'Alice Smith',
      comment: 'Paid the majority of the amount',
      editing: false,
    },
    {
      name: 'David',
      amount: 1500,
      date: '2023-11-23',
      amount_paid: 1200,
      paid: true,
      written_by: 'Bob Johnson',
      comment: 'Almost fully paid',
      editing: false,
    },
    {
      name: 'Eva',
      amount: 900,
      date: '2023-11-24',
      amount_paid: 400,
      paid: false,
      written_by: 'Charlie Brown',
      comment: 'Yet to make a payment',
      editing: false,
    },
    {
      name: 'Frank',
      amount: 1100,
      date: '2023-11-25',
      amount_paid: 900,
      paid: true,
      written_by: 'David Williams',
      comment: 'Paid most of the amount',
      editing: false,
    },
    {
      name: 'Grace',
      amount: 1300,
      date: '2023-11-26',
      amount_paid: 1100,
      paid: true,
      written_by: 'Eva Miller',
      comment: 'Almost fully paid',
      editing: false,
    },
    {
      name: 'Harry',
      amount: 1000,
      date: '2023-11-27',
      amount_paid: 600,
      paid: false,
      written_by: 'Frank Davis',
      comment: 'Yet to make a payment',
      editing: false,
    },
    {
      name: 'Ivy',
      amount: 1200,
      date: '2023-11-28',
      amount_paid: 1000,
      paid: true,
      written_by: 'Grace Wilson',
      comment: 'Paid the majority of the amount',
      editing: false,
    },
    {
      name: 'Jack',
      amount: 1400,
      date: '2023-11-29',
      amount_paid: 1200,
      paid: true,
      written_by: 'Harry Smith',
      comment: 'Almost fully paid',
      editing: false,
    },
    {
      name: 'Kelly',
      amount: 800,
      date: '2023-11-30',
      amount_paid: 400,
      paid: false,
      written_by: 'Ivy Davis',
      comment: 'Yet to make a payment',
      editing: false,
    },
    {
      name: 'Leo',
      amount: 1100,
      date: '2023-12-01',
      amount_paid: 900,
      paid: true,
      written_by: 'Jack Miller',
      comment: 'Paid most of the amount',
      editing: false,
    },
  ];

export  const priceList: Price[] = [
    { name: 'Product A', variation: 'Small', bulk_price: 50, unit_price: 5 },
    { name: 'Product B', variation: 'Medium', bulk_price: 80, unit_price: 8 },
    { name: 'Product C', variation: 'Large', bulk_price: 120, unit_price: 12 },
    { name: 'Product D', variation: 'Small', bulk_price: 45, unit_price: 4.5 },
    { name: 'Product E', variation: 'Medium', bulk_price: 75, unit_price: 7.5 },
    { name: 'Product F', variation: 'Large', bulk_price: 110, unit_price: 11 },
    { name: 'Product G', variation: 'Small', bulk_price: 48, unit_price: 4.8 },
    { name: 'Product H', variation: 'Medium', bulk_price: 82, unit_price: 8.2 },
    { name: 'Product I', variation: 'Large', bulk_price: 115, unit_price: 11.5 },
    { name: 'Product J', variation: 'Medium', bulk_price: 78, unit_price: 7.8 },
  ];
  
  
  