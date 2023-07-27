const { translate } = require('bing-translate-api');

async function handleTranslateCommand(message) {
  const args = message.body.split(' ');

  // Check if the command has the required arguments
  if (args.length < 2) {
    message.reply('Invalid command format. Please use: !translate <target_language_code> <text_to_translate> or use !translate list to show all supported language.');
    return;
  }

  const targetLanguage = args[1];
  const textToTranslate = args.slice(2).join(' ');

  if(targetLanguage == "list") {
    message.reply(`Available language:\n\n"af": "Afrikaans",\n"sq": "Albanian",\n"am": "Amharic",\n"ar": "Arabic",\n"hy": "Armenian",\n"as": "Assamese",\n"az": "Azerbaijani",\n"bn": "Bangla",\n"ba": "Bashkir",\n"eu": "Basque",\n"bs": "Bosnian",\n"bg": "Bulgarian",\n"yue": "Cantonese (Traditional)",\n"ca": "Catalan",\n"lzh": "Chinese (Literary)",\n"zh-Hans": "Chinese Simplified",\n"zh-Hant": "Chinese Traditional",\n"hr": "Croatian",\n"cs": "Czech",\n"da": "Danish",\n"prs": "Dari",\n"dv": "Divehi",\n"nl": "Dutch",\n"en": "English",\n"et": "Estonian",\n"fo": "Faroese",\n"fj": "Fijian",\n"fil": "Filipino",\n"fi": "Finnish",\n"fr": "French",\n"fr-CA": "French (Canada)",\n"gl": "Galician",\n"lug": "Ganda",\n"ka": "Georgian",\n"de": "German",\n"el": "Greek",\n"gu": "Gujarati",\n"ht": "Haitian Creole",\n"ha": "Hausa",\n"he": "Hebrew",\n"hi": "Hindi",\n"mww": "Hmong Daw",\n"hu": "Hungarian",\n"is": "Icelandic",\n"ig": "Igbo",\n"id": "Indonesian",\n"ikt": "Inuinnaqtun",\n"iu": "Inuktitut",\n"iu-Latn": "Inuktitut (Latin)",\n"ga": "Irish",\n"it": "Italian",\n"ja": "Japanese",\n"kn": "Kannada",\n"kk": "Kazakh",\n"km": "Khmer",\n"rw": "Kinyarwanda",\n"tlh-Latn": "Klingon (Latin)",\n"gom": "Konkani",\n"ko": "Korean",\n"ku": "Kurdish (Central)",\n"kmr": "Kurdish (Northern)",\n"ky": "Kyrgyz",\n"lo": "Lao",\n"lv": "Latvian",\n"ln": "Lingala",\n"lt": "Lithuanian",\n"dsb": "Lower Sorbian",\n"mk": "Macedonian",\n"mai": "Maithili",\n"mg": "Malagasy",\n"ms": "Malay",\n"ml": "Malayalam",\n"mt": "Maltese",\n"mr": "Marathi",\n"mn-Cyrl": "Mongolian (Cyrillic)",\n"mn-Mong": "Mongolian (Traditional)",\n"my": "Myanmar (Burmese)",\n"mi": "Māori",\n"ne": "Nepali",\n"nb": "Norwegian",\n"nya": "Nyanja",\n"or": "Odia",\n"ps": "Pashto",\n"fa": "Persian",\n"pl": "Polish",\n"pt": "Portuguese (Brazil)",\n"pt-PT": "Portuguese (Portugal)",\n"pa": "Punjabi",\n"otq": "Querétaro Otomi",\n"ro": "Romanian",\n"run": "Rundi",\n"ru": "Russian",\n"sm": "Samoan",\n"sr-Cyrl": "Serbian (Cyrillic)",\n"sr-Latn": "Serbian (Latin)",\n"st": "Sesotho",\n"nso": "Sesotho sa Leboa",\n"tn": "Setswana",\n"sn": "Shona",\n"sd": "Sindhi",\n"si": "Sinhala",\n"sk": "Slovak",\n"sl": "Slovenian",\n"so": "Somali",\n"es": "Spanish",\n"sw": "Swahili",\n"sv": "Swedish",\n"ty": "Tahitian",\n"ta": "Tamil",\n"tt": "Tatar",\n"te": "Telugu",\n"th": "Thai",\n"bo": "Tibetan",\n"ti": "Tigrinya",\n"to": "Tongan",\n"tr": "Turkish",\n"tk": "Turkmen",\n"uk": "Ukrainian",\n"hsb": "Upper Sorbian",\n"ur": "Urdu",\n"ug": "Uyghur",\n"uz": "Uzbek (Latin)",\n"vi": "Vietnamese",\n"cy": "Welsh",\n"xh": "Xhosa",\n"yo": "Yoruba",\n"yua": "Yucatec Maya",\n"zu": "Zulu"`);
    return;
  }

  if(args.length > 3) {
  translate(textToTranslate, null, targetLanguage)
    .then((res) => {
      const translatedText = res.translation;
      message.reply(`Result:\n\n${translatedText}`);
    })
    .catch((err) => {  
      message.reply('Translation failed. Please try again later.');
      if (err.message.includes("is not supported!")) return message.reply("Translation failed. The target language is not supported.");
    });
    return;
}

    if (message.hasQuotedMsg && args.length == 2) {
        const quotedtype = (await message.getQuotedMessage()).type;
        const quotedmessage = (await message.getQuotedMessage()).body;
        if (quotedtype != 'chat') return message.reply('Not a text.')

        translate(quotedmessage, null, targetLanguage)
        .then((res) => {
          const translatedText = res.translation;
          message.reply(`Result:\n\n${translatedText}`);
        })
        .catch((err) => {
          message.reply('Translation failed. Please try again later.');
          if (err.message.includes("is not supported!")) return message.reply("Translation failed. The target language is not supported.");
        });
        return;
    }
};

module.exports = handleTranslateCommand
