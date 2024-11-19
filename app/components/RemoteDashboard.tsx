'use client'

import { useState, useEffect, useRef, MutableRefObject, useMemo } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { feature } from 'topojson-client';
import { Feature, Geometry } from 'geojson';
import Image from 'next/image';

interface PointData {
  name: string;
  lat: number;
  lng: number;
  workers: number;
  color: string;
  size: number;
  imgUrl: string;
  cities?: CityData[];
}

interface CityData {
  name: string;
  workers: number;
  imgUrl: string;
  lat: number;
  lng: number;
}

interface GlobeElement {
  pointOfView: (config: { lat: number; lng: number; altitude: number }) => void;
  controls: () => {
    enabled: boolean;
    enableZoom: boolean;
    enableRotate: boolean;
    enablePan: boolean;
  };
}

const RegionCard = ({ point, isSelected, onClick }: { 
  point: PointData | CityData; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <div 
    className={`group hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200 cursor-pointer ${
      isSelected ? 'bg-gray-50 ring-2 ring-[#2E8B57]' : ''
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3 sm:space-x-4">
      <div className="flex-shrink-0">
        <Image 
          src={point.imgUrl}
          alt={point.name} 
          width={32}
          height={32}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 group-hover:text-[#2E8B57] transition-colors duration-200 text-xs sm:text-sm md:text-base">
          {point.name}
        </h3>
        <p className="text-gray-500 text-xs mt-0.5 sm:mt-1">
          {point.workers.toLocaleString()} {('cities' in point) ? 'assistentes sociais' : 'cursos'}.
        </p>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const pointsData = useMemo<PointData[]>(() => [
    {
      name: 'Portugal',
      lat: 39.5,
      lng: -8,
      workers: 15000,
      color: '#DC143C',
      size: 0.5,
      imgUrl: '/ptpi.png',
      cities: [
        {
          name: 'Lisboa',
          workers: 5,
          imgUrl: '/btpi.png',
          size: 0.5,
          lat: 38.7223,
          lng: -9.1393
        },
        {
          name: 'Porto',
          workers: 2,
          imgUrl: '/pcpi.png',
          lat: 41.1579,
          lng: -8.6291
        },
        {
          name: 'Coimbra',
          workers: 2,
          imgUrl: '/ccpi.png',
          lat: 40.2033,
          lng: -8.4103
        }
      ]
    },
    {
      name: 'América do Norte',
      lat: 40,
      lng: -100,
      workers: 650000,
      color: '#4169E1',
      size: 1,
      imgUrl: '/arcpi.png'
    },
    {
      name: 'América do Sul', 
      lat: -15,
      lng: -60,
      workers: 180000,
      color: '#32CD32',
      size: 1,
      imgUrl: '/bzpi.png'
    },
    {
      name: 'Europa',
      lat: 50,
      lng: 10,
      workers: 800000,
      color: '#FFD700',
      size: 0.6,
      imgUrl: '/epi.png'
    },
    {
      name: 'África',
      lat: 0,
      lng: 20,
      workers: 100000,
      color: '#FF4500',
      size: 1,
      imgUrl: '/afpi.png'
    },
    {
      name: 'Ásia',
      lat: 35,
      lng: 100,
      workers: 450000,
      color: '#9370DB',
      size: 0.8,
      imgUrl: '/aspi.png'
    },
    {
      name: 'Oceânia',
      lat: -25,
      lng: 135,
      workers: 30000,
      color: '#20B2AA',
      size: 0.7,
      imgUrl: '/aupi.png'
    }
  ], []);

  const [isLoading, setIsLoading] = useState(true);
  const [landPolygons, setLandPolygons] = useState<Feature<Geometry>[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showingPortugalCities, setShowingPortugalCities] = useState(false);
  const globeRef = useRef<GlobeElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (globeRef.current) {
        const altitude = width < 480 ? 4 : 
                        width < 768 ? 3.5 : 
                        width < 1024 ? 3 : 
                        2.5;
        
        globeRef.current.pointOfView({ 
          lat: 0,
          lng: 0,
          altitude 
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('//unpkg.com/world-atlas/land-110m.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Falha ao carregar dados do mapa');
        }
        return res.json();
      })
      .then((landTopo) => {
        if (!landTopo || !landTopo.objects || !landTopo.objects.land) {
          throw new Error('Dados do mapa inválidos');
        }
        
        const features = feature(landTopo, landTopo.objects.land);
        if (!features) {
          throw new Error('Falha ao processar features do mapa');
        }
        
        setLandPolygons(Array.isArray(features) ? features : [features]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar mapa:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      
      const controls = globe.controls();
      controls.enabled = true;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = false;
      
      const width = window.innerWidth;
      const altitude = width < 480 ? 4 : 
                      width < 768 ? 3.5 : 
                      width < 1024 ? 3 : 
                      2.5;
      
      globe.pointOfView({ 
        lat: 0,
        lng: 0,
        altitude
      });
    }
  }, []);

  useEffect(() => {
    if (globeRef.current && selectedRegion) {
      const portugalData = pointsData.find(point => point.name === 'Portugal');
      
      if (showingPortugalCities && portugalData?.cities) {
        const selectedCity = portugalData.cities.find(city => city.name === selectedRegion);
        if (selectedCity) {
          globeRef.current.pointOfView({
            lat: selectedCity.lat,
            lng: selectedCity.lng,
            altitude: 0.5
          });
          return;
        }
      }

      const selectedPoint = pointsData.find(point => point.name === selectedRegion);
      if (selectedPoint) {
        const width = window.innerWidth;
        const altitude = width < 480 ? 3 : 
                        width < 768 ? 2.5 : 
                        width < 1024 ? 2 : 
                        1.5;
        
        globeRef.current.pointOfView({
          lat: selectedPoint.lat,
          lng: selectedPoint.lng,
          altitude
        });
      }
    }
  }, [selectedRegion, pointsData, showingPortugalCities]);

  const htmlElement = (d: object): HTMLElement => {
    const point = d as PointData;
    const el = document.createElement('div');
    
    const width = window.innerWidth;
    const size = width < 480 ? 16 : 
                 width < 768 ? 18 : 
                 width < 1024 ? 20 : 
                 24;
    
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.backgroundImage = `url(${point.imgUrl})`;
    el.style.backgroundSize = 'contain';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundPosition = 'center';
    el.style.pointerEvents = 'auto';
    el.style.cursor = 'pointer';
    el.style.touchAction = 'manipulation';
    
    el.addEventListener('click', () => {
      setSelectedRegion(point.name);
      if (point.name === 'Portugal') {
        setShowingPortugalCities(true);
      } else {
        setShowingPortugalCities(false);
      }
      setIsMenuOpen(true);
    });
    
    return el;
  };

  const getGlobePoints = () => {
    if (showingPortugalCities) {
      const portugalData = pointsData.find(point => point.name === 'Portugal');
      return portugalData?.cities || [];
    }
    return pointsData;
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-[#f5f5f1] flex items-center justify-center">
        <div className="text-lg sm:text-xl md:text-2xl text-gray-600">A Carregar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full m-0 overflow-hidden relative bg-[#f5f5f1] flex flex-col items-center justify-between">
      {!isLoading && (
        <>
          <button 
            onClick={() => {
              if (showingPortugalCities) {
                setShowingPortugalCities(false);
                setSelectedRegion('Portugal');
              } else {
                setIsMenuOpen(!isMenuOpen);
              }
            }}
            className="fixed top-2 right-2 z-50 p-2 sm:p-3 rounded-md hover:bg-[#f0eae3] transition-colors duration-300 bg-white shadow-md md:top-4 md:right-4"
            aria-label="Abrir menu"
          >
            <div className={`w-4 sm:w-5 h-0.5 bg-[#2E8B57] mb-1 sm:mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}/>
            <div className={`w-4 sm:w-5 h-0.5 bg-[#2E8B57] mb-1 sm:mb-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}/>
            <div className={`w-4 sm:w-5 h-0.5 bg-[#2E8B57] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}/>
          </button>

          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
              onClick={() => {
                setIsMenuOpen(false);
                setShowingPortugalCities(false);
              }}
            />
          )}

          <div className={`fixed top-0 right-0 h-full bg-white shadow-xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-40 w-full sm:w-72 md:w-80 overflow-hidden`}>
            <div className="h-full flex flex-col">
              <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2E8B57]">
                  {showingPortugalCities ? 'Universidades' : 'Assistentes Sociais'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  {showingPortugalCities ? 'Universidades com curso de Serviço Social' : 'Distribuição global de assistentes sociais.'}
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {showingPortugalCities ? 
                    pointsData.find(p => p.name === 'Portugal')?.cities?.map((city) => (
                      <RegionCard
                        key={city.name}
                        point={city}
                        isSelected={selectedRegion === city.name}
                        onClick={() => setSelectedRegion(city.name)}
                      />
                    ))
                    :
                    pointsData.map((point) => (
                      <RegionCard
                        key={point.name}
                        point={point}
                        isSelected={selectedRegion === point.name}
                        onClick={() => {
                          setSelectedRegion(point.name);
                          if (point.name === 'Portugal') {
                            setShowingPortugalCities(true);
                          }
                        }}
                      />
                    ))
                  }
                </div>
              </div>

              <div className="p-2 sm:p-3 md:p-4 border-t border-gray-100 bg-gray-50">
                <p className="text-[10px] sm:text-xs text-center text-gray-500">
                  Dados baseados em relatórios oficiais da IFSW.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[calc(100vh-32px)] sm:h-[calc(100vh-40px)] md:h-[calc(100vh-60px)] lg:h-[calc(100vh-80px)] flex items-center justify-center relative">
            <div className="absolute z-0 text-[32px] sm:text-[40px] md:text-[60px] lg:text-[100px] xl:text-[160px] roboto-medium text-[#f0eae3] select-none text-center px-2 sm:px-4">
              SERVIÇO SOCIAL
            </div>
            <Globe
              ref={globeRef as MutableRefObject<GlobeMethods>}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              showGlobe={true}
              showAtmosphere={false}
              atmosphereColor="#3a228a"
              atmosphereAltitude={0.25}
              polygonsData={landPolygons}
              polygonCapColor={() => '#ffffff00'}
              polygonSideColor={() => '#ffffff00'}
              htmlElementsData={getGlobePoints()}
              htmlElement={htmlElement}
              htmlLat="lat"
              htmlLng="lng"
              htmlAltitude={0.01}
            />
          </div>

          <footer className="w-full bg-white py-4 px-6 border-t border-gray-100 fixed bottom-0">
            <div className="container mx-auto">
              <div className="flex justify-center">
                <div className="text-sm text-gray-600">
                  © {new Date().getFullYear()} Serviço Social. Todos os direitos reservados.
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}