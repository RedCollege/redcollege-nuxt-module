<template lang="pug">
.grid.gap-2
    Tabs(default-value="account")
        TabsList
            TabsTrigger(value="account") Cuenta
            TabsTrigger(value="pass") Password
        TabsContent(value="account") make changes aksdh kajshdjkash jkdashjkdh asjkdhajskdhjkashd kjashdkjas hdjk ashdjkashjdk ahsjkdhasjkdhasjk dhasjkdh
        TabsContent(value="pass") Your password here
    Tabs(default-value="account")
        TabsList(variant="pill")
            TabsTrigger(value="account", variant="pill")
                Icon(name="tabler:mail", size="18")
                span Asignaturas
            TabsTrigger(value="pass", variant="pill")
                Icon(name="tabler:settings", size="18")
                span Asistencias
            TabsTrigger(value="d", variant="pill") Estudiantes
            TabsTrigger(value="t", variant="pill") Evaluaciones
        TabsContent(value="account") make changes aksdh kajshdjkash jkdashjkdh asjkdhajskdhjkashd kjashdkjas hdjk ashdjkashjdk ahsjkdhasjkdhasjk dhasjkdh
        TabsContent(value="pass") Your password here
        TabsContent(value="d") Your password here
        TabsContent(value="t") Your password here
</template>
