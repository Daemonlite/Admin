const currency = ()=>{return [
  { value: "AFN", title: "AFN - Afghan Afghani" },
  { value: "ALL", title: "ALL - Albanian Lek" },
  { value: "DZD", title: "DZD - Algerian Dinar" },
  { value: "AOA", title: "AOA - Angolan Kwanza" },
  { value: "ARS", title: "ARS - Argentine Peso" },
  { value: "AMD", title: "AMD - Armenian Dram" },
  { value: "AWG", title: "AWG - Aruban Florin" },
  { value: "AUD", title: "AUD - Australian Dollar" },
  { value: "AZN", title: "AZN - Azerbaijani Manat" },
  { value: "BSD", title: "BSD - Bahamian Dollar" },
  { value: "BHD", title: "BHD - Bahraini Dinar" },
  { value: "BDT", title: "BDT - Bangladeshi Taka" },
  { value: "BBD", title: "BBD - Barbadian Dollar" },
  { value: "BYR", title: "BYR - Belarusian Ruble" },
  { value: "BEF", title: "BEF - Belgian Franc" },
  { value: "BZD", title: "BZD - Belize Dollar" },
  { value: "BMD", title: "BMD - Bermudan Dollar" },
  { value: "BTN", title: "BTN - Bhutanese Ngultrum" },
  { value: "BTC", title: "BTC - Bitcoin" },
  { value: "BOB", title: "BOB - Bolivian Boliviano" },
  { value: "BAM", title: "BAM - Bosnia-Herzegovina Convertible Mark" },
  { value: "BWP", title: "BWP - Botswanan Pula" },
  { value: "BRL", title: "BRL - Brazilian Real" },
  { value: "GBP", title: "GBP - British Pound Sterling" },
  { value: "BND", title: "BND - Brunei Dollar" },
  { value: "BGN", title: "BGN - Bulgarian Lev" },
  { value: "BIF", title: "BIF - Burundian Franc" },
  { value: "KHR", title: "KHR - Cambodian Riel" },
  { value: "CAD", title: "CAD - Canadian Dollar" },
  { value: "CVE", title: "CVE - Cape Verdean Escudo" },
  { value: "KYD", title: "KYD - Cayman Islands Dollar" },
  { value: "XOF", title: "XOF - CFA Franc BCEAO" },
  { value: "XAF", title: "XAF - CFA Franc BEAC" },
  { value: "XPF", title: "XPF - CFP Franc" },
  { value: "CLP", title: "CLP - Chilean Peso" },
  { value: "CNY", title: "CNY - Chinese Yuan" },
  { value: "COP", title: "COP - Colombian Peso" },
  { value: "KMF", title: "KMF - Comorian Franc" },
  { value: "CDF", title: "CDF - Congolese Franc" },
  { value: "CRC", title: "CRC - Costa Rican ColÃ³n" },
  { value: "HRK", title: "HRK - Croatian Kuna" },
  { value: "CUC", title: "CUC - Cuban Convertible Peso" },
  { value: "CZK", title: "CZK - Czech Republic Koruna" },
  { value: "DKK", title: "DKK - Danish Krone" },
  { value: "DJF", title: "DJF - Djiboutian Franc" },
  { value: "DOP", title: "DOP - Dominican Peso" },
  { value: "XCD", title: "XCD - East Caribbean Dollar" },
  { value: "EGP", title: "EGP - Egyptian Pound" },
  { value: "ERN", title: "ERN - Eritrean Nakfa" },
  { value: "EEK", title: "EEK - Estonian Kroon" },
  { value: "ETB", title: "ETB - Ethiopian Birr" },
  { value: "EUR", title: "EUR - Euro" },
  { value: "FKP", title: "FKP - Falkland Islands Pound" },
  { value: "FJD", title: "FJD - Fijian Dollar" },
  { value: "GMD", title: "GMD - Gambian Dalasi" },
  { value: "GEL", title: "GEL - Georgian Lari" },
  { value: "DEM", title: "DEM - German Mark" },
  { value: "GHS", title: "GHS - Ghanaian Cedi" },
  { value: "GIP", title: "GIP - Gibraltar Pound" },
  { value: "GRD", title: "GRD - Greek Drachma" },
  { value: "GTQ", title: "GTQ - Guatemalan Quetzal" },
  { value: "GNF", title: "GNF - Guinean Franc" },
  { value: "GYD", title: "GYD - Guyanaese Dollar" },
  { value: "HTG", title: "HTG - Haitian Gourde" },
  { value: "HNL", title: "HNL - Honduran Lempira" },
  { value: "HKD", title: "HKD - Hong Kong Dollar" },
  { value: "HUF", title: "HUF - Hungarian Forint" },
  { value: "ISK", title: "ISK - Icelandic KrÃ³na" },
  { value: "INR", title: "INR - Indian Rupee" },
  { value: "IDR", title: "IDR - Indonesian Rupiah" },
  { value: "IRR", title: "IRR - Iranian Rial" },
  { value: "IQD", title: "IQD - Iraqi Dinar" },
  { value: "ILS", title: "ILS - Israeli New Sheqel" },
  { value: "ITL", title: "ITL - Italian Lira" },
  { value: "JMD", title: "JMD - Jamaican Dollar" },
  { value: "JPY", title: "JPY - Japanese Yen" },
  { value: "JOD", title: "JOD - Jordanian Dinar" },
  { value: "KZT", title: "KZT - Kazakhstani Tenge" },
  { value: "KES", title: "KES - Kenyan Shilling" },
  { value: "KWD", title: "KWD - Kuwaiti Dinar" },
  { value: "KGS", title: "KGS - Kyrgystani Som" },
  { value: "LAK", title: "LAK - Laotian Kip" },
  { value: "LVL", title: "LVL - Latvian Lats" },
  { value: "LBP", title: "LBP - Lebanese Pound" },
  { value: "LSL", title: "LSL - Lesotho Loti" },
  { value: "LRD", title: "LRD - Liberian Dollar" },
  { value: "LYD", title: "LYD - Libyan Dinar" },
  { value: "LTL", title: "LTL - Lithuanian Litas" },
  { value: "MOP", title: "MOP - Macanese Pataca" },
  { value: "MKD", title: "MKD - Macedonian Denar" },
  { value: "MGA", title: "MGA - Malagasy Ariary" },
  { value: "MWK", title: "MWK - Malawian Kwacha" },
  { value: "MYR", title: "MYR - Malaysian Ringgit" },
  { value: "MVR", title: "MVR - Maldivian Rufiyaa" },
  { value: "MRO", title: "MRO - Mauritanian Ouguiya" },
  { value: "MUR", title: "MUR - Mauritian Rupee" },
  { value: "MXN", title: "MXN - Mexican Peso" },
  { value: "MDL", title: "MDL - Moldovan Leu" },
  { value: "MNT", title: "MNT - Mongolian Tugrik" },
  { value: "MAD", title: "MAD - Moroccan Dirham" },
  { value: "MZM", title: "MZM - Mozambican Metical" },
  { value: "MMK", title: "MMK - Myanmar Kyat" },
  { value: "NAD", title: "NAD - Namibian Dollar" },
  { value: "NPR", title: "NPR - Nepalese Rupee" },
  { value: "ANG", title: "ANG - Netherlands Antillean Guilder" },
  { value: "TWD", title: "TWD - New Taiwan Dollar" },
  { value: "NZD", title: "NZD - New Zealand Dollar" },
  { value: "NIO", title: "NIO - Nicaraguan CÃ³rdoba" },
  { value: "NGN", title: "NGN - Nigerian Naira" },
  { value: "KPW", title: "KPW - North Korean Won" },
  { value: "NOK", title: "NOK - Norwegian Krone" },
  { value: "OMR", title: "OMR - Omani Rial" },
  { value: "PKR", title: "PKR - Pakistani Rupee" },
  { value: "PAB", title: "PAB - Panamanian Balboa" },
  { value: "PGK", title: "PGK - Papua New Guinean Kina" },
  { value: "PYG", title: "PYG - Paraguayan Guarani" },
  { value: "PEN", title: "PEN - Peruvian Nuevo Sol" },
  { value: "PHP", title: "PHP - Philippine Peso" },
  { value: "PLN", title: "PLN - Polish Zloty" },
  { value: "QAR", title: "QAR - Qatari Rial" },
  { value: "RON", title: "RON - Romanian Leu" },
  { value: "RUB", title: "RUB - Russian Ruble" },
  { value: "RWF", title: "RWF - Rwandan Franc" },
  { value: "SVC", title: "SVC - Salvadoran ColÃ³n" },
  { value: "WST", title: "WST - Samoan Tala" },
  { value: "SAR", title: "SAR - Saudi Riyal" },
  { value: "RSD", title: "RSD - Serbian Dinar" },
  { value: "SCR", title: "SCR - Seychellois Rupee" },
  { value: "SLL", title: "SLL - Sierra Leonean Leone" },
  { value: "SGD", title: "SGD - Singapore Dollar" },
  { value: "SKK", title: "SKK - Slovak Koruna" },
  { value: "SBD", title: "SBD - Solomon Islands Dollar" },
  { value: "SOS", title: "SOS - Somali Shilling" },
  { value: "ZAR", title: "ZAR - South African Rand" },
  { value: "KRW", title: "KRW - South Korean Won" },
  { value: "XDR", title: "XDR - Special Drawing Rights" },
  { value: "LKR", title: "LKR - Sri Lankan Rupee" },
  { value: "SHP", title: "SHP - St.Helena Pound" },
  { value: "SDG", title: "SDG - Sudanese Pound" },
  { value: "SRD", title: "SRD - Surinamese Dollar" },
  { value: "SZL", title: "SZL - Swazi Lilangeni" },
  { value: "SEK", title: "SEK - Swedish Krona" },
  { value: "CHF", title: "CHF - Swiss Franc" },
  { value: "SYP", title: "SYP - Syrian Pound" },
  { value: "STD", title: "STD - São Tomé and Príncipe Dobra" },
  { value: "TJS", title: "TJS - Tajikistani Somoni" },
  { value: "TZS", title: "TZS - Tanzanian Shilling" },
  { value: "THB", title: "THB - Thai Baht" },
  { value: "TOP", title: "TOP - Tongan pa'anga" },
  { value: "TTD", title: "TTD - Trinidad & Tobago Dollar" },
  { value: "TND", title: "TND - Tunisian Dinar" },
  { value: "TRY", title: "TRY - Turkish Lira" },
  { value: "TMT", title: "TMT - Turkmenistani Manat" },
  { value: "UGX", title: "UGX - Ugandan Shilling" },
  { value: "UAH", title: "UAH - Ukrainian Hryvnia" },
  { value: "AED", title: "AED - United Arab Emirates Dirham" },
  { value: "UYU", title: "UYU - Uruguayan Peso" },
  { value: "USD", title: "USD - US Dollar" },
  { value: "UZS", title: "UZS - Uzbekistan Som" },
  { value: "VUV", title: "VUV - Vanuatu Vatu" },
  { value: "VEF", title: "VEF - Venezuelan BolÃ­var" },
  { value: "VND", title: "VND - Vietnamese Dong" },
  { value: "YER", title: "YER - Yemeni Rial" },
  { value: "ZMK", title: "ZMK - Zambian Kwacha" },
      
]}

export default currency