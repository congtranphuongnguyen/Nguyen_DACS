import precisionGrinder from './assets/precision_hand_grinder.png';

export const products = [
  {
    id: "p1",
    name: "Ethiopia Yirgacheffe",
    price: "150000",
    label: "Light Roast",
    roast: "Light Roast",
    region: "Africa",
    category: "beans",
    roastDate: "2026-05-03",
    description: "Jasmine, Peach, Tea",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf6_i-dykjGChXhOtC-6pjqqAz5zBxBmUCbCgutk3mQrPTHluzFPxM6A4hbSKb0jBa13U35xaBynFXvPNAZF_8pFRVUSs_O45OvgGM9waq3UmyaGCi9J1SwUwOXjONwltG44d1zke3In0FZuHFHpoV5RW6fqZ1cb4eCd1-Luo6HNTmg53RTKRHQXr2l-5wgKFn9BpsJKIHJj5TBqmYvGt6HWJ1Alg3QbGs9pdzmU_Ncj9IllHix9h1bcKhrheSzRzSK8A9KA-OdfE",
    flavorProfile: ["Floral", "Citrus", "Honey"],
    isSingleOrigin: true
  },
  {
    id: "sig-morning-mist",
    name: "Morning Mist",
    price: "120000",
    label: "Balanced & Ethereal",
    roast: "Medium Roast",
    region: "Ethiopia & Colombia Blend",
    category: "beans",
    roastDate: "2026-05-02",
    description: "Jasmine, Citrus Zest, Honey",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600",
    isSingleOrigin: false
  },
  {
    id: "sig-midnight-velvet",
    name: "Midnight Velvet",
    price: "130000",
    label: "Rich & Woody",
    roast: "Dark Roast",
    region: "Sumatran & Brazilian Santos",
    category: "beans",
    roastDate: "2026-04-30",
    description: "Sumatran Mandheling & Brazilian Santos.",
    image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=600",
    isSingleOrigin: false
  },
  {
    id: "sig-golden-hour",
    name: "Golden Hour",
    price: "140000",
    label: "Bright & Vibrant",
    roast: "Medium Roast",
    region: "Guatemalan & Kenya",
    category: "beans",
    roastDate: "2026-05-01",
    description: "Guatemalan Antigua & Kenya AA.",
    image: "https://images.pexels.com/photos/1235688/pexels-photo-1235688.jpeg?auto=compress&cs=tinysrgb&w=600",
    isSingleOrigin: false
  },
  {
    id: "sig-wild-geisha",
    name: "Wild Geisha",
    price: "250000",
    label: "Rare Find",
    roast: "Light Roast",
    region: "Panama - Chiriquí",
    category: "beans",
    roastDate: "2026-05-04",
    description: "Bergamot, Dried Apricot",
    image: "https://images.pexels.com/photos/1233528/pexels-photo-1233528.jpeg?auto=compress&cs=tinysrgb&w=600",
    isSingleOrigin: true
  },
  {
    id: "sig-the-obsidian",
    name: "The Obsidian",
    price: "180000",
    label: "Darkest Roast",
    roast: "Very Dark Roast",
    region: "Malabar & Nicaragua",
    category: "beans",
    roastDate: "2026-04-28",
    description: "Intense, Smoky, Bold",
    image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=600",
    isSingleOrigin: false
  },
  {
    id: "p3",
    name: "Sumatra Mandheling",
    price: "160000",
    label: "Dark Roast",
    roast: "Dark Roast",
    region: "Asia & Pacific",
    category: "beans",
    roastDate: "2026-05-02",
    description: "Earthy, Cedar, Spice",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-OeE0FYy01gFlA6QQ-5tXBIo_MikkMHXclijg6gJdR9G16pXbkAiF17pVWJr3CfbNvtd7QI5e9giNygnditAgS_5kPdiuCkn5RiJZIwa3imo6wUajF-0JwckwAnPbZB_nOYEhOaE2RmpmJrkSjuvnwX9LtQhZdcXwfR6yWoei9fQSLxyHhhkQ3mJYvMG1hdwUB6O7gzflTGfnQ_YOX13gGg1GAJzV4HJjH0ZkorqIoYvWDS9BftZQ-I9z7jQK959l73EZxy9euA8",
    isSingleOrigin: true
  },
  {
    id: "gear-aureum-kettle",
    name: "Aureum Kettle",
    price: "2200000",
    category: "gear",
    label: "Manual Pour",
    roast: "N/A",
    region: "N/A",
    description: "Copper-layered precision gooseneck kettle.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt9AtZwA5MNCusAQqpssJDo83SaZHWBS7fwnuanZMXFUhuCmC0fuoHyjBQqpLm-jvari6JyGe3iFB4r-RUzO2_pI05Vcmzd9qT0EuhlnOonRUn_CbzCHTZ5JfRxergbR_ercnM5-CCfADmOMztXz3a4nh5-IKYvjqR4KwB7MQ_1-Fd5yOHV0trBC8f3CTzWSuaT76i94-8vqfzOoFKa5P2pUHuN2-dlQqF0ghz3CXmuDkbYUSsDFxzkY5FGFRFd5z2G_4m_wavfRPh"
  },
  {
    id: "gear-obsidian-grinder",
    name: "Obsidian Grinder",
    price: "4500000",
    category: "gear",
    label: "Titanium Burrs",
    roast: "N/A",
    region: "N/A",
    description: "Hand-forged titanium burrs for precision grinding.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqXLR_iJshZvOWH0a1V05V68TmxNagVzlfUSgXPC372awhpy_hdFFp86LMsq2oKQ4Y6lTCXT4GcH3rdcq-LznH7BvyZJF5OJ4gulOBu9-0qdG15GpRNxFsRYazYY4ynIhw5QXxDzPgxNgnZd_1kDQZd5ArhsfCMfq0HJjvcnAgjTFAwTMvIeWMVe2OS7FpPpp_3K9AVibXn65jJJg-BbdkvcjNZ4xHmkQLwlS6bxXM0XppqXNhtieOfboFvwVTR4MHjtyY3YGypsUB"
  },
  {
    id: "gear-terra-cups",
    name: "Terra Mug Set",
    price: "450000",
    category: "gear",
    label: "Ceramic",
    roast: "N/A",
    region: "N/A",
    description: "Hand-crafted ceramic mugs for the perfect ritual.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqZcApBxa3vH1NvCPbYg0_fyVsfZdNG5xn_c3aeTppuwW7KxiXJP9tTtum-b8o0SJmDRygu3bZoI9dsrE4M1ZeB4hh-2AsH4RFzGloQDvSJ3zn6priEIefUCmgileNsDDvG9vH__Dxp24bcQ_5Ko_QhVBcRJ84vp1tJ4TjxiSMBQ5cK6lumEZIxWe2R3FASn-yZ4m3XKXBGKfRiXpj_5u8EycvsNAeJLEZQ_3IG1JszqXW1q3k6ONZYPl58IGLLRMMaEXAlTIQG8rN"
  },
  {
    id: "gear-prism-dripper",
    name: "Prism Dripper",
    price: "850000",
    category: "gear",
    label: "Glass",
    roast: "N/A",
    region: "N/A",
    description: "High-clarity borosilicate glass dripper.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBulWnekBkYiYjN2JOWXZgCubhALkO-ktKmpLFz6WwOWwlDjyNDdtII-ze8QdJnVsT755H5_YdP0jfWAr2e-X4X_SipxBIAQbpA_t3NJtFW105pv9_2doqc2VDazYAaqeVvn-NF25NpQeHuqK7p0YdRWKtAEro01X5w8rAk06274MRvpgpDn-AHyXP0tLavsnWdHlG-O98h9rRnowfI8Ung0zZiRmovgHIS0PSYZKjpvxHErKpulqIcawz4asj96lZw-sH_sTOn48JZ"
  },
  {
    id: "p9",
    name: "Butter Croissant",
    price: "55000",
    category: "pastry",
    label: "House Special",
    description: "Flaky, buttery, and freshly baked every morning.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "p10",
    name: "Chocolate Muffin",
    price: "45000",
    category: "pastry",
    label: "Best Seller",
    description: "Rich dark chocolate with a soft, moist center.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400"
  }
];
