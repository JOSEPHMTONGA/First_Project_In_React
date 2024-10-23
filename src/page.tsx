import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Bed, Bath, Phone, MapPin, DollarSign, ChevronUp, ChevronDown, Search, Filter, Plus, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as React from "react"

type Property = {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  location: string;
  images: string[];
  phoneNumbers: string[];
  comment: string;
  forSale: boolean;
}

const ModernRentBuyPostDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("rent")
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [currentDistrict, setCurrentDistrict] = useState<string>("Ndola")
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    setUserLocation([-12.9687, 28.6366]) // Ndola, Copperbelt coordinates
    setCurrentDistrict("Ndola")
    
    // Generate 80 properties (50 for rent, 30 for sale)
    const generatedProperties = Array.from({ length: 80 }, (_, i) => ({
      id: i + 1,
      title: `${['Modern', 'Cozy', 'Spacious', 'Luxurious'][Math.floor(Math.random() * 4)]} ${['House', 'Apartment', 'Bedspace'][Math.floor(Math.random() * 3)]} in ${['Kansenshi', 'Northrise', 'Itawa', 'Mushili', 'Masala'][Math.floor(Math.random() * 5)]}`,
      price: Math.floor(Math.random() * 5000) + 500,
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      type: ['House', 'Apartment', 'Bedspace'][Math.floor(Math.random() * 3)],
      location: ['Kansenshi', 'Northrise', 'Itawa', 'Mushili', 'Masala'][Math.floor(Math.random() * 5)],
      images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D"],
      phoneNumbers: ["+260 97 1234567", "+260 96 7654321"],
      comment: "Great property in Ndola",
      forSale: i >= 50 // First 50 for rent, last 30 for sale
    }))

    setProperties(generatedProperties)
    setFilteredProperties(generatedProperties)
  }, [])

  useEffect(() => {
    const filtered = properties.filter(property => 
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ((activeTab === "rent" && !property.forSale) || (activeTab === "buy" && property.forSale))
    )
    setFilteredProperties(filtered)
  }, [searchTerm, activeTab, properties])

  const handlePostProperty = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowPaymentDialog(true)
  }

  const handlePayment = () => {
    setShowPaymentDialog(false)
    alert("CONGRATULATIONS YOUR ADVERT HAS BEEN PLACED. KINDLY KEEP YOUR PHONE ON, YOU WILL RECEIVE SOME CALLS")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary flex items-center">
            <Home className="mr-2" /> Rent or Buy and Post
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-[120px] sm:max-w-xs"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" /> Post Property
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm" className="hidden sm:flex">
              <Plus className="mr-2 h-4 w-4" /> Post Property
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <div className="h-[30vh] sm:h-[40vh]">
          {userLocation && (
            <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={userLocation}>
                <Popup>Ndola, Copperbelt</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>

        <div className="flex-grow bg-white shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rent">Rent</TabsTrigger>
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="post">Post</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-grow">
              <TabsContent value="rent" className="p-4 h-full">
                <h2 className="text-2xl font-semibold mb-4">Properties for Rent in {currentDistrict}</h2>
                {filteredProperties.filter(p => !p.forSale).length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredProperties.filter(p => !p.forSale).map(property => (
                      <Card key={property.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <img src={property.images[0]} alt={property.title} className="w-full sm:w-1/3 h-48 object-cover" />
                          <CardContent className="p-4 flex-grow">
                            <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                            <p className="text-primary font-bold mb-2">K{property.price.toLocaleString()} / month</p>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span className="flex items-center"><Bed className="mr-1" size={16} />{property.bedrooms}</span>
                              <span className="flex items-center"><Bath className="mr-1" size={16} />{property.bathrooms}</span>
                              <span className="flex items-center"><Home className="mr-1" size={16} />{property.type}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 flex items-center"><MapPin className="mr-1" size={16} />{property.location}</p>
                            <div className="text-sm">
                              {property.phoneNumbers.map(number => (
                                <p key={number} className="flex items-center"><Phone className="mr-1" size={16} />{number}</p>
                              ))}
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p>No properties for rent found in this location.</p>
                )}
              </TabsContent>
              <TabsContent value="buy" className="p-4 h-full">
                <h2 className="text-2xl font-semibold mb-4">Properties for Sale in {currentDistrict}</h2>
                {filteredProperties.filter(p => p.forSale).length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredProperties.filter(p => p.forSale).map(property => (
                      <Card key={property.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <img src={property.images[0]} alt={property.title} className="w-full sm:w-1/3 h-48 object-cover" />
                          <CardContent className="p-4 flex-grow">
                            <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                            <p className="text-primary font-bold mb-2">K{property.price.toLocaleString()}</p>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span className="flex items-center"><Bed className="mr-1" size={16} />{property.bedrooms}</span>
                              <span className="flex items-center"><Bath className="mr-1" size={16} />{property.bathrooms}</span>
                              <span className="flex items-center"><Home className="mr-1" size={16} />{property.type}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 flex items-center"><MapPin className="mr-1" size={16} />{property.location}</p>
                            <div className="text-sm">
                              {property.phoneNumbers.map(number => (
                                <p key={number} className="flex items-center"><Phone className="mr-1" size={16} />{number}</p>
                              ))}
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p>No properties for sale found in this location.</p>
                )}
              </TabsContent>
              <TabsContent value="post" className="p-4 h-full">
                <h2 className="text-2xl font-semibold mb-4">Post a Property</h2>
                <form onSubmit={handlePostProperty} className="space-y-4">
                  <Input placeholder="Area (Compound)" required />
                  <Input placeholder="Price in Kwacha" type="number" required />
                  <Input placeholder="Title" required />
                  <div className="flex space-x-4">
                    <Input placeholder="Bedrooms" type="number" required />
                    <Input placeholder="Bathrooms" type="number" required />
                  </div>
                  <Input placeholder="Type (e.g., House, Bed-space, Apartment)" required />
                  <Input type="file" accept="image/*" multiple required />
                  <div className="flex space-x-4">
                    <Input placeholder="Phone Number 1" required />
                    <Input placeholder="Phone Number 2" required />
                  </div>
                  <Textarea placeholder="Comment" required />
                  <Button type="submit" className="w-full">Submit Advert</Button>
                </form>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </main>

      <footer className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">Download our app or visit our website for more properties!</p>
          <Button variant="outline" className="mt-2">Download App</Button>
        </div>
      </footer>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Required</DialogTitle>
          </DialogHeader>
          <p>Please make a mobile money payment to post your advert.</p>
          <Button onClick={handlePayment}>Confirm Payment</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ModernRentBuyPostDashboard