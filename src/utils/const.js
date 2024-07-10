const elementsPigment = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]

const addPigment = (line) => {
    for (let i = 0; i < 3; i++) {
        line += elementsPigment[Math.floor(Math.random() * elementsPigment.length)]
    }

    return line;
}

export const filmsPerPage = 5;

export const maxFilmsOnPage = 25;

export const sortFields = ["imdb_id", "budget", "original_language", "popularity", "release_date", "revenue", "runtime", "status", "vote_average"];

export const getRandomColorImage = () => {
    let colorLink = "https://placehold.co/60x100/";

    colorLink = addPigment(colorLink);
    colorLink += "/";
    colorLink = addPigment(colorLink);

    return colorLink;
}