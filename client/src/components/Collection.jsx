import React from 'react';

const Collections = () => {
  const collections = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center&auto=format&q=80',
      subtitle: "NEW ACCESSORIES",
      title: "Fashion For This Summer",
      description: "Discover the latest trends in summer fashion accessories",
      link: "/product"
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=center&auto=format&q=80',
      subtitle: "MEN COLLECTION",
      title: "New Autumn Arrivals 2020",
      description: "Sophisticated styles for the modern gentleman",
      link: "/product"
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9fc6068?w=600&h=800&fit=crop&crop=center&auto=format&q=80',
      subtitle: "WOMEN COLLECTION",
      title: "Trendy Look For Every Day",
      description: "Elegant pieces for your everyday wardrobe",
      link: "/product"
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop&crop=center&auto=format&q=80',
      subtitle: "SEASON SALE",
      title: "Season Sale",
      description: "Exclusive offers on premium fashion items",
      link: "/product"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
            Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections that blend style, comfort, and sophistication
          </p>
        </div>

        {/* Collections Grid */}
        <div className="space-y-24 lg:space-y-32">
          {collections.map((collection, index) => {
            const isEven = index % 2 === 0;
            const isImageRight = isEven;
            
            return (
              <div 
                key={collection.id} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  index === 0 ? 'lg:-mt-8' : 
                  index === 1 ? 'lg:mt-12' : 
                  index === 2 ? 'lg:-mt-6' : 
                  'lg:mt-8'
                }`}
              >
                {/* Image Section */}
                <div className={`lg:w-2/5 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
                    <img 
                      src={collection.image} 
                      alt={collection.title}
                      className="w-full h-[500px] lg:h-[650px] object-cover transition-all duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x800/e5e7eb/9ca3af?text=Fashion+Collection';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`lg:w-3/5 ${isImageRight ? 'lg:order-1 lg:pr-16' : 'lg:order-2 lg:pl-16'}`}>
                  <div className={`text-center lg:${isImageRight ? 'text-right' : 'text-left'} space-y-6`}>
                    
                    {/* Statistics */}
                    {index === 0 && (
                      <div className="mb-12">
                        <div className="inline-block">
                          <h3 className="text-7xl lg:text-8xl xl:text-9xl font-extralight text-black mb-3 leading-none">
                            2587<span className="text-5xl lg:text-6xl text-gray-500">+</span>
                          </h3>
                          <p className="text-xl lg:text-2xl text-gray-600 font-light tracking-wide">
                            Products for you
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {index === 3 && (
                      <div className="mb-12">
                        <div className="inline-block">
                          <h3 className="text-7xl lg:text-8xl xl:text-9xl font-extralight text-black mb-3 leading-none">
                            5649<span className="text-5xl lg:text-6xl text-gray-500">+</span>
                          </h3>
                          <p className="text-xl lg:text-2xl text-gray-600 font-light tracking-wide">
                            Satisfied clients
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Collection Content */}
                    <div className="space-y-6">
                      <span className="inline-block text-sm lg:text-base font-medium text-gray-500 uppercase tracking-[0.3em] border-b border-gray-200 pb-2">
                        {collection.subtitle}
                      </span>
                      
                      <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-black leading-tight">
                        {collection.title}
                      </h2>
                      
                      <p className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                        {collection.description}
                      </p>
                      
                      <div className="pt-4">
                        <a 
                          href={collection.link}
                          className="group inline-flex items-center space-x-4 text-lg font-medium text-black hover:text-gray-600 transition-all duration-300"
                        >
                          <span className="w-12 h-[2px] bg-black group-hover:w-16 group-hover:bg-gray-600 transition-all duration-300"></span>
                          <span className="tracking-wide">Shop Now</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-24 lg:mt-32">
          <a href="/product">
            <button className="group relative overflow-hidden bg-black text-white px-12 py-4 text-base font-medium tracking-widest uppercase transition-all duration-300 hover:bg-gray-900 hover:shadow-xl hover:-translate-y-1">
              <span className="relative z-10">View All Collections</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Collections;