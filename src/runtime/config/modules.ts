export interface Module {
    link: string
    title: string
    subtitle: string
    img: string
    doHighlight: boolean
}

export const applicationModules: Module[] = [
    {
        link: "https://convivenciaescolar.redcollege.net/",
        title: "Ayün",
        img: "https://login.redcollege.net/logos/modulos/ayun.svg",
        subtitle: "Convivencia Escolar",
        doHighlight: true
    },
    {
        link: "https://librodigital.redcollege.net",
        title: "Libro de Clases Digital",
        img: "https://login.redcollege.net/logos/modulos/libroClases.svg",
        subtitle: "",
        doHighlight: false
    },
    {
        link: "https://planificacion.redcollege.net",
        title: "Planificaciones Gantt",
        img: "https://login.redcollege.net/logos/modulos/planificacion.svg",
        subtitle: "",
        doHighlight: false
    },
    {
        link: "https://evaluaciones.redcollege.net",
        title: "Evaluaciones y Retroalimentación",
        img: "https://login.redcollege.net/logos/modulos/evaluaciones.svg",
        subtitle: "",
        doHighlight: false
    },
    {
        link: "https://nido.redcollege.net",
        title: "Nido",
        img: "https://login.redcollege.net/logos/modulos/nido.svg",
        subtitle: "Gestión de alumnos NEE",
        doHighlight: false
    },
    {
        link: "https://comunicaciones.redcollege.net/bandeja/recibidos",
        title: "Visto, +Comunicación",
        img: "https://login.redcollege.net/logos/modulos/comunicacion.svg",
        subtitle: "",
        doHighlight: false
    },
    {
        link: "https://centrodedatos.redcollege.net",
        title: "Centro de Datos",
        img: "https://login.redcollege.net/logos/modulos/centroDatos.svg",
        subtitle: "",
        doHighlight: false
    },
    {
        link: "https://aulavirtual.redcollege.net",
        title: "Aula Virtual",
        img: "https://login.redcollege.net/logos/modulos/aula.svg",
        subtitle: "",
        doHighlight: false
    },
    {
        link: "https://evaluaciones.redcollege.net/rubricas-v2/mibanco/listado",
        title: "Rúbricas",
        subtitle: "(En Mantención)",
        img: "https://login.redcollege.net/logos/modulos/rubricas.svg",
        doHighlight: false
    }
]
