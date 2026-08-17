const freelancers = [
  {
    id: 1,
    name: "Aarav Sharma",
    title: "Full Stack Developer",
    image: "https://i.pravatar.cc/300?img=12",
    location: "Delhi, India",
    rating: 4.9,
    reviews: 124,
    experience: "Expert",
    hourlyRate: 35,
    completedProjects: 86,
    successRate: 98,
    memberSince: "2023",
    availability: "Available",
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
      "Express.js",
      "REST API",
    ],
    bio: "Full Stack Developer specializing in modern web applications, REST APIs, and scalable MERN stack solutions. I help startups and businesses build fast, reliable, and user-friendly digital products.",
    portfolio: [
      {
        id: 1,
        title: "SaaS Dashboard",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "E-commerce Platform",
        category: "Full Stack",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "Analytics Application",
        category: "Dashboard",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      },
    ],
    testimonials: [
      {
        name: "Rahul Mehta",
        role: "Startup Founder",
        rating: 5,
        comment:
          "Aarav delivered an excellent application and communicated clearly throughout the project.",
      },
      {
        name: "Neha Kapoor",
        role: "Product Manager",
        rating: 5,
        comment:
          "Very professional developer. The final product exceeded our expectations.",
      },
    ],
  },

  {
    id: 2,
    name: "Priya Mehta",
    title: "UI/UX Designer",
    image: "https://i.pravatar.cc/300?img=47",
    location: "Mumbai, India",
    rating: 4.8,
    reviews: 98,
    experience: "Expert",
    hourlyRate: 28,
    completedProjects: 71,
    successRate: 96,
    memberSince: "2022",
    availability: "Available",
    skills: [
      "Figma",
      "UI Design",
      "UX Research",
      "Prototyping",
      "Wireframing",
      "Design Systems",
      "User Testing",
    ],
    bio: "Creative UI/UX designer focused on building intuitive, beautiful, and user-friendly digital experiences. I transform complex ideas into simple and engaging interfaces.",
    portfolio: [
      {
        id: 1,
        title: "Fintech Mobile App",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "Finance Dashboard",
        category: "Dashboard Design",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "Mobile Banking App",
        category: "Mobile Design",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
      },
    ],
    testimonials: [
      {
        name: "Ritika Jain",
        role: "Business Owner",
        rating: 5,
        comment:
          "Priya understood our requirements perfectly and created a beautiful interface.",
      },
      {
        name: "Amit Shah",
        role: "Founder",
        rating: 5,
        comment:
          "Creative, responsive, and very easy to work with.",
      },
    ],
  },

  {
    id: 3,
    name: "Rohan Verma",
    title: "Content Writer & SEO Specialist",
    image: "https://i.pravatar.cc/300?img=11",
    location: "Bangalore, India",
    rating: 4.7,
    reviews: 76,
    experience: "Intermediate",
    hourlyRate: 20,
    completedProjects: 63,
    successRate: 94,
    memberSince: "2024",
    availability: "Available",
    skills: [
      "SEO",
      "Content Writing",
      "Copywriting",
      "Blog Writing",
      "Research",
      "Technical Writing",
    ],
    bio: "SEO-focused content writer helping brands create engaging, search-friendly content that drives organic traffic and improves online visibility.",
    portfolio: [
      {
        id: 1,
        title: "Technology Blog",
        category: "Content Writing",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "SEO Content Strategy",
        category: "SEO",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "Marketing Articles",
        category: "Copywriting",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
      },
    ],
    testimonials: [
      {
        name: "Karan Malhotra",
        role: "Marketing Manager",
        rating: 5,
        comment:
          "The articles were well researched and optimized perfectly for SEO.",
      },
      {
        name: "Simran Arora",
        role: "Founder",
        rating: 4,
        comment:
          "Good communication and high-quality content.",
      },
    ],
  },

  {
    id: 4,
    name: "Sneha Kapoor",
    title: "Digital Marketing Specialist",
    image: "https://i.pravatar.cc/300?img=44",
    location: "Pune, India",
    rating: 4.9,
    reviews: 112,
    experience: "Expert",
    hourlyRate: 30,
    completedProjects: 94,
    successRate: 97,
    memberSince: "2021",
    availability: "Available",
    skills: [
      "SEO",
      "Social Media",
      "Google Ads",
      "Facebook Ads",
      "Analytics",
      "Content Strategy",
    ],
    bio: "Digital marketing specialist experienced in SEO, paid advertising, social media campaigns, and brand growth.",
    portfolio: [
      {
        id: 1,
        title: "E-commerce Growth Campaign",
        category: "Digital Marketing",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "Social Media Campaign",
        category: "Social Media",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "SEO Analytics",
        category: "SEO",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      },
    ],
    testimonials: [
      {
        name: "Mohit Agarwal",
        role: "E-commerce Owner",
        rating: 5,
        comment:
          "Sneha significantly improved our online visibility and conversions.",
      },
      {
        name: "Pooja Sharma",
        role: "Founder",
        rating: 5,
        comment:
          "Excellent marketing strategy and consistent communication.",
      },
    ],
  },

  {
    id: 5,
    name: "Kabir Singh",
    title: "Frontend Developer",
    image: "https://i.pravatar.cc/300?img=68",
    location: "Jaipur, India",
    rating: 4.6,
    reviews: 58,
    experience: "Intermediate",
    hourlyRate: 22,
    completedProjects: 47,
    successRate: 92,
    memberSince: "2024",
    availability: "Available",
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Responsive Design",
    ],
    bio: "Frontend developer passionate about creating fast, responsive, and accessible interfaces using modern technologies.",
    portfolio: [
      {
        id: 1,
        title: "Restaurant Website",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "Travel Website",
        category: "Web Design",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "Portfolio Website",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80",
      },
    ],
    testimonials: [
      {
        name: "Ravi Kumar",
        role: "Business Owner",
        rating: 5,
        comment:
          "Kabir created a clean and responsive website exactly as requested.",
      },
      {
        name: "Ankit Jain",
        role: "Founder",
        rating: 4,
        comment:
          "Good frontend skills and quick delivery.",
      },
    ],
  },

  {
    id: 6,
    name: "Ananya Gupta",
    title: "Graphic Designer",
    image: "https://i.pravatar.cc/300?img=48",
    location: "Ahmedabad, India",
    rating: 4.8,
    reviews: 83,
    experience: "Intermediate",
    hourlyRate: 24,
    completedProjects: 69,
    successRate: 95,
    memberSince: "2023",
    availability: "Available",
    skills: [
      "Illustrator",
      "Photoshop",
      "Branding",
      "Logo Design",
      "Figma",
      "Social Media Design",
    ],
    bio: "Graphic designer creating memorable visual identities, logos, marketing materials, and digital assets.",
    portfolio: [
      {
        id: 1,
        title: "Brand Identity",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "Logo Collection",
        category: "Logo Design",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "Social Media Kit",
        category: "Graphic Design",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=80",
      },
    ],
    testimonials: [
      {
        name: "Deepak Shah",
        role: "Business Owner",
        rating: 5,
        comment:
          "Ananya created a fantastic brand identity for our company.",
      },
      {
        name: "Tanya Mehta",
        role: "Marketing Manager",
        rating: 5,
        comment:
          "Very creative and professional designer.",
      },
    ],
  },

  {
    id: 7,
    name: "Vikram Joshi",
    title: "Backend Developer",
    image: "https://i.pravatar.cc/300?img=53",
    location: "Hyderabad, India",
    rating: 4.9,
    reviews: 105,
    experience: "Expert",
    hourlyRate: 38,
    completedProjects: 91,
    successRate: 98,
    memberSince: "2021",
    availability: "Available",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "REST API",
      "Authentication",
    ],
    bio: "Backend engineer building secure, scalable APIs and database-driven applications for growing businesses.",
    portfolio: [
      {
        id: 1,
        title: "SaaS Backend",
        category: "Backend Development",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "REST API Platform",
        category: "API Development",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "Database Architecture",
        category: "Database",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
      },
    ],
    testimonials: [
      {
        name: "Arjun Mehta",
        role: "CTO",
        rating: 5,
        comment:
          "Vikram built a reliable and scalable backend for our platform.",
      },
      {
        name: "Nikhil Rao",
        role: "Founder",
        rating: 5,
        comment:
          "Excellent technical knowledge and problem-solving ability.",
      },
    ],
  },

  {
    id: 8,
    name: "Meera Nair",
    title: "Mobile App Developer",
    image: "https://i.pravatar.cc/300?img=45",
    location: "Kochi, India",
    rating: 4.7,
    reviews: 67,
    experience: "Intermediate",
    hourlyRate: 26,
    completedProjects: 52,
    successRate: 94,
    memberSince: "2023",
    availability: "Available",
    skills: [
      "React Native",
      "JavaScript",
      "Firebase",
      "API Integration",
      "UI Development",
      "Mobile Apps",
    ],
    bio: "Mobile developer creating modern cross-platform applications with smooth interfaces and reliable performance.",
    portfolio: [
      {
        id: 1,
        title: "Fitness Mobile App",
        category: "Mobile Development",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "Food Delivery App",
        category: "React Native",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "Finance App",
        category: "Mobile UI",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
      },
    ],
    testimonials: [
      {
        name: "Sahil Verma",
        role: "Startup Founder",
        rating: 5,
        comment:
          "Meera delivered a smooth and professional mobile application.",
      },
      {
        name: "Isha Kapoor",
        role: "Product Manager",
        rating: 4,
        comment:
          "Great communication and solid development skills.",
      },
    ],
  },
];

export default freelancers;