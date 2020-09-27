export interface Result {
    screenshotUrls: string[];
    ipadScreenshotUrls: string[];
    appletvScreenshotUrls: any[];
    artworkUrl60: string;
    artworkUrl512: string;
    artworkUrl100: string;
    artistViewUrl: string;
    isGameCenterEnabled: boolean;
    advisories: string[];
    supportedDevices: string[];
    features: string[];
    kind: string;
    currency: string;
    trackCensoredName: string;
    languageCodesISO2A: string[];
    fileSizeBytes: string;
    sellerUrl: string;
    contentAdvisoryRating: string;
    averageUserRatingForCurrentVersion: number;
    userRatingCountForCurrentVersion: number;
    averageUserRating: number;
    trackViewUrl: string;
    trackContentRating: string;
    primaryGenreId: number;
    primaryGenreName: string;
    releaseDate: Date;
    trackId: number;
    trackName: string;
    isVppDeviceBasedLicensingEnabled: boolean;
    genreIds: string[];
    sellerName: string;
    minimumOsVersion: string;
    formattedPrice: string;
    releaseNotes: string;
    currentVersionReleaseDate: Date;
    artistId: number;
    artistName: string;
    genres: string[];
    price: number;
    description: string;
    bundleId: string;
    version: string;
    wrapperType: string;
    userRatingCount: number;
}

export interface RootObject {
    resultCount: number;
    results: Result[];
}
