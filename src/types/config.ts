export interface Weather {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface WeatherState {
  city: string;
  weather: Weather | null;
  defaultWeathers: Weather[];
}

export interface StoreState {
  city: string;
  weather: string;
}

export interface PostIt {
  id: number;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
}

export interface ColorOption {
  value: string;
  label: string;
}

