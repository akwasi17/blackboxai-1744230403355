import { useState } from 'react';
import { ArrowLeftIcon, PhoneIcon, MapPinIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

function PoliceStations({ onBack }) {
  // Mock data for police stations
  const stations = [
    {
      id: 1,
      name: 'Central Police Station',
      address: 'Harry Thuku Road',
      phone: '020 222222, 0721 337999',
      hours: '24/7',
      services: ['Emergency Response', 'Criminal Investigation', 'Community Policing']
    },
    {
      id: 2,
      name: 'North District Station',
      address: 'Nairobi',
      phone: 'Not available',
      hours: '24/7',
      services: ['Traffic Division', 'Special Operations', 'Public Safety']
    },
    {
      id: 3,
      name: 'South Precinct',
      address: 'Nairobi',
      phone: 'Not available',
      hours: '24/7',
      services: ['Patrol Unit', 'Detective Bureau', 'Community Outreach']
    },
    {
      id: 4,
      name: 'Kasarani Police Station',
      address: 'Kamiti Road, off Thika Road',
      phone: '020 803366, 0721 338999, 020-8563222, 020-8560756',
      hours: '24/7',
      services: ['Emergency Services']
    },
    {
      id: 5,
      name: 'Kabete Police Station',
      address: 'Waiyaki Way',
      phone: '020 632222, 0721-365 999',
      hours: '24/7',
      services: ['Gender Desk']
    },
    {
      id: 6,
      name: 'Parklands Police Station',
      address: 'Parklands Road',
      phone: '020 742238 / 632222, 0721-364 999, 020-3742238, 020-3746115',
      hours: '24/7',
      services: []
    },
    {
      id: 7,
      name: 'Gigiri Police Station',
      address: 'United Nations Cres',
      phone: '020 521 353, 0721 363999, 020-7120629',
      hours: '24/7',
      services: []
    },
    {
      id: 8,
      name: 'Kilimani Police Station',
      address: 'Jabavu Road',
      phone: '020 722222, 0721-368 999, 020-2721683, 020-2710392, 020-2728885',
      hours: '24/7',
      services: ['Gender Desk', 'Children\'s Protection Unit', 'Medical Clinic']
    },
    {
      id: 9,
      name: 'Buru Buru Police Station',
      address: 'Mumias South Road',
      phone: '020 792900, 0721 327 999, 020-787404, 020-787038, 020-783584, 020-786878, 020-3531864',
      hours: '24/7',
      services: ['Child Protection Area']
    },
    {
      id: 10,
      name: 'Embakasi Police Station',
      address: 'Rd to Utawala Academy, Embakasi Road',
      phone: '020 823155 / 823210, 0721-359 999, 020-823200',
      hours: '24/7',
      services: []
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Chatbot
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Police Stations</h2>
          <p className="text-sm text-gray-500 mt-1">Find police stations in your area</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((station) => (
              <div
                key={station.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-32 bg-primary/5 flex items-center justify-center">
                  <ShieldCheckIcon className="w-16 h-16 text-primary/40" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {station.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{station.address}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <a
                        href={`tel:${station.phone}`}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {station.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">{station.hours}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {station.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Emergency Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                In case of emergency, please dial your local emergency number immediately.
                Do not wait to report through this platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoliceStations;