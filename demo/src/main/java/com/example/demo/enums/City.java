package com.example.demo.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;


public enum City {
    ADIYAMAN("Adıyaman", 570),
    AFYONKARAHISAR("Afyonkarahisar", 260),
    AGRI("Ağrı", 1040),
    AMASYA("Amasya", 370),
    ANKARA("Ankara", 0),
    ANTALYA("Antalya", 700),
    ARDAHAN("Ardahan", 1260),
    ARTVIN("Artvin", 1170),
    AYDIN("Aydın", 580),
    BALIKESIR("Balıkesir", 460),
    BARTIN("Bartın", 320),
    BATMAN("Batman", 960),
    BAYBURT("Bayburt", 1150),
    BILECIK("Bilecik", 230),
    BINGOL("Bingöl", 900),
    BOLU("Bolu", 200),
    BURDUR("Burdur", 650),
    BURSA("Bursa", 230),
    CANAKKALE("Çanakkale", 470),
    CANKIRI("Çankırı", 220),
    CORUM("Çorum", 400),
    DENIZLI("Denizli", 650),
    DIYARBAKIR("Diyarbakır", 900),
    DUZCE("Düzce", 220),
    EDIRNE("Edirne", 470),
    ELAZIG("Elazığ", 780),
    ERZINCAN("Erzincan", 740),
    ERZURUM("Erzurum", 1050),
    ESKISEHIR("Eskişehir", 230),
    GAZIANTEP("Gaziantep", 800),
    GIRESUN("Giresun", 1050),
    GUMUSHANE("Gümüşhane", 1080),
    HAKKARI("Hakkari", 1250),
    HATAY("Hatay", 460),
    IGDIR("Iğdır", 1150),
    ISPARTA("Isparta", 620),
    ISTANBUL("İstanbul", 450),
    IZMIR("İzmir", 580),
    KASTAMONU("Kastamonu", 440),
    KAYSERI("Kayseri", 320),
    KIRKLARELI("Kırklareli", 460),
    KIRSEHIR("Kırşehir", 140),
    KOCAELI("Kocaeli", 350),
    KONYA("Konya", 230),
    KUTAHYA("Kütahya", 300),
    MALATYA("Malatya", 760),
    MANISA("Manisa", 550),
    MARDIN("Mardin", 1000),
    MERSIN("Mersin", 500),
    MUGLA("Muğla", 670),
    NEVSEHIR("Nevşehir", 290),
    NIGDE("Niğde", 320),
    ORDU("Ordu", 830),
    OSMANIYE("Osmaniye", 700),
    RIZE("Rize", 1060),
    SAKARYA("Sakarya", 370),
    SAMSUN("Samsun", 840),
    SIIRT("Siirt", 1040),
    SINOP("Sinop", 600),
    SIVAS("Sivas", 540),
    SANLIURFA("Şanlıurfa", 1050),
    SIRNAK("Şırnak", 1200),
    TEKIRDAG("Tekirdağ", 440),
    TOKAT("Tokat", 520),
    TRABZON("Trabzon", 1000),
    TUNCELI("Tunceli", 820),
    USAK("Uşak", 530),
    VAN("Van", 1200),
    YALOVA("Yalova", 400),
    YOZGAT("Yozgat", 300),
    ZONGULDAK("Zonguldak", 350);

    private final String displayName;
    private final int distanceFromAnkara;

    City(String displayName, int distanceFromAnkara) {
        this.displayName = displayName;
        this.distanceFromAnkara = distanceFromAnkara;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    public int getDistanceFromAnkara() {
        return distanceFromAnkara;
    }

    @JsonCreator // For deserialization: allows case-insensitive and display name matching
    public static City fromString(String value) {
        for (City city : City.values()) {
            if (city.name().equalsIgnoreCase(value) || city.getDisplayName().equalsIgnoreCase(value)) {
                return city;
            }
        }
        throw new IllegalArgumentException("No enum constant for value: " + value);
    }
}
