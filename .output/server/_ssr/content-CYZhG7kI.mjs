//#region node_modules/.nitro/vite/services/ssr/assets/content-CYZhG7kI.js
var ROMANTIC_QUOTES = [
	"Contigo hasta el café frío sabe mejor.",
	"El amor no se mide en días, sino en ganas de repetirlos.",
	"Eres mi lugar favorito al final de cada día.",
	"Todo lo bonito se vuelve más bonito cuando lo cuento contigo.",
	"Nos elegimos otra vez, y otra, y otra.",
	"Mi parte preferida del día es cualquiera que tenga tu nombre.",
	"Contigo aprendí que la calma también es una forma de amar.",
	"No hay prisa: tenemos todos los martes del mundo."
];
var DAILY_QUESTIONS = [
	"¿Qué momento de esta semana te hizo sonreír sin querer?",
	"¿Qué te gustaría que hiciéramos juntos antes de fin de mes?",
	"¿Cuál fue el primer detalle que te enamoró del otro?",
	"¿Qué canción nos describe hoy?",
	"¿Qué es algo que quieres agradecerme y aún no me dices?",
	"¿Cómo imaginas un domingo perfecto para los dos?",
	"¿Qué queremos aprender juntos este año?"
];
function pickOfTheDay(items, offset = 0) {
	return items[(Math.floor(Date.now() / 864e5) + offset) % items.length];
}
var NOTE_CATEGORIES = [
	{
		value: "amor",
		label: "Amor"
	},
	{
		value: "agradecimiento",
		label: "Agradecimiento"
	},
	{
		value: "recuerdo",
		label: "Recuerdo"
	},
	{
		value: "perdon",
		label: "Perdón"
	},
	{
		value: "sueno",
		label: "Sueño"
	},
	{
		value: "cotidiano",
		label: "Cotidiano"
	}
];
var EVENT_CATEGORIES = [
	{
		value: "romantica",
		label: "Cita romántica"
	},
	{
		value: "cena",
		label: "Cena"
	},
	{
		value: "pelicula",
		label: "Película"
	},
	{
		value: "viaje",
		label: "Viaje"
	},
	{
		value: "aniversario",
		label: "Aniversario"
	},
	{
		value: "otro",
		label: "Otro"
	}
];
var WISH_CATEGORIES = [
	{
		value: "lugar",
		label: "Lugar por visitar"
	},
	{
		value: "pelicula",
		label: "Película o serie"
	},
	{
		value: "restaurante",
		label: "Restaurante"
	},
	{
		value: "experiencia",
		label: "Experiencia"
	},
	{
		value: "regalo",
		label: "Regalo"
	},
	{
		value: "proyecto",
		label: "Proyecto"
	}
];
var REACTIONS = [
	{
		type: "corazon",
		emoji: "❤️",
		label: "Corazón"
	},
	{
		type: "estrella",
		emoji: "⭐",
		label: "Estrella"
	},
	{
		type: "sonrisa",
		emoji: "😊",
		label: "Sonrisa"
	}
];
function labelFor(list, value) {
	return list.find((c) => c.value === value)?.label ?? value;
}
//#endregion
export { ROMANTIC_QUOTES as a, pickOfTheDay as c, REACTIONS as i, EVENT_CATEGORIES as n, WISH_CATEGORIES as o, NOTE_CATEGORIES as r, labelFor as s, DAILY_QUESTIONS as t };
