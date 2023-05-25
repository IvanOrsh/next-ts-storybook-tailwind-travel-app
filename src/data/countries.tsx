import { Option } from "@/interfaces/Option";
import { CountryISO, images } from "./images";

interface Country {
  city: string;
  countryISO: CountryISO;
}

const countriesData: Country[] = [
  {
    city: "Amsterdam",
    countryISO: "NL",
  },
  {
    city: "Rome",
    countryISO: "IT",
  },
  {
    city: "Berlin",
    countryISO: "DE",
  },
  {
    city: "Paris",
    countryISO: "FR",
  },
  {
    city: "Washington",
    countryISO: "US",
  },
  {
    city: "Moscow",
    countryISO: "RU",
  },
  {
    city: "Brussels",
    countryISO: "BE",
  },
];

export const countries: Option[] = countriesData.map((country) => ({
  value: country.countryISO,
  label: (
    <>
      <img
        src={images[country.countryISO]}
        alt={country.countryISO.toLowerCase()}
        className="mr-2 h-5 w-5"
      />{" "}
      {`${country.city}, ${country.countryISO}`}
    </>
  ),
}));
