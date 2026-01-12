
import React from 'react';

export enum ServiceType {
  CUSTOMS = 'Despacho aduanal',
  MARITIME = 'Transporte marítimo',
  AIR = 'Transporte aéreo',
  LAND = 'Transporte terrestre',
  TRADING = 'Comercializadora',
  WAREHOUSE = 'Almacenaje / Depósito Fiscal',
  INSURANCE = 'Seguro de Mercancía',
  PERMITS = 'Trámites Especiales (COFEPRIS/SEMARNAT)',
  OTHER = 'Otro'
}

export type AppPath = 'home' | 'transporte' | 'comercializadora' | 'aduana' | 'almacenadora';

export interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  service: ServiceType;
  website: string; // Honeypot
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: AppPath;
  onNavigate?: (path: AppPath) => void;
}

export interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  text: string;
}
