<script setup lang="ts">

interface Payment {
    id: number
    status: string
    autor: string
    titulo: string
    tipo: string
    curso: string
    asignatura: string
    periodo: number,
    colaboradores: Array<string>
    cobertura: number
}



const headers: { title: string }[] = [
    { title: 'Estado' },
    { title: 'Autor' },
    { title: 'Título' },
    { title: 'Tipo' },
    { title: 'Curso' },
    { title: 'Asignatura' },
    { title: 'Año' },
    { title: 'Colaboradores' },
    { title: 'Cobertura' },
    { title: '' }
]

const planificaciones: Payment[] = [
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },{
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    },
    {
        id: 1,
        status: "Por Validar",
        autor: "",
        titulo: "Planificación Matemática",
        tipo: "Media",
        curso: "3B",
        asignatura: "MA03",
        periodo: 2024 ,
        colaboradores: [],
        cobertura: 20,
    }
    // ...
]
</script>

<template lang="pug">
Card.my-4
    CardHeader
        CardTitle Auditoría General
    CardContent.space-y-4
        .flex.items-center.justify-between
            .flex.flex-1.justify-between
                Input(placeholder="Filter tasks...", class="h-8 w-[150px] lg:w-[250px]")
                .flex.items-center.space-x-2
                    PlanificacionesTableFilter(label="Profesor", icon="school")
                    PlanificacionesTableFilter(label="Nivel", icon="triangles")
                    PlanificacionesTableFilter(label="Curso", icon="users-group")
                    PlanificacionesTableFilter(label="Asignatura", icon="folder-check")
                    PlanificacionesTableFilter(label="Estado", icon="circle-half-2")
                    PlanificacionesTableFilter(label="Cobertura", icon="chart-area-line-filled")
        .border.rounded-md
            ScrollArea(class="h-[calc(100vh_-_230px)]")
                Table
                    TableHeader
                        TableRow
                            TableHead(v-for="header in headers") {{ header.title }}
                    TableBody
                        TableRow(v-for="planificacion in planificaciones")
                            TableCell
                                PlanificacionesTableEstadoSwitcher
                            TableCell
                                Avatar.w-8.h-8
                                    AvatarImage(src="https://nyc3.digitaloceanspaces.com/redcollege/usuarios/avatars/d4xqeh2afln2cwmo7.jpeg")
                                    AvatarFallback {{  planificacion.autor  }}
                            TableCell
                                .max-w-48
                                    p.truncate {{  planificacion.titulo  }}
                            TableCell
                                Badge(variant="green") {{  planificacion.tipo  }}
                            TableCell {{  planificacion.curso  }}
                            TableCell {{  planificacion.asignatura  }}
                            TableCell {{  planificacion.periodo  }}
                            TableCell
                                .flex.overflow-hidden(class="-space-x-1")
                                    Avatar.w-8.h-8.ring-2.ring-card(v-for="i in 3")
                                        AvatarImage(src="https://nyc3.digitaloceanspaces.com/redcollege/usuarios/avatars/d4xqeh2afln2cwmo7.jpeg")
                                        AvatarFallback {{  planificacion.autor  }}
                            TableCell
                                Progress(v-model="planificacion.cobertura")
                            TableCell
                                Icon(name="tabler:dots")
</template>
