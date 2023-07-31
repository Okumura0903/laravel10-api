<template>
    <div class="container py-5">
        <h1>404</h1>
        <p>NOT FOUND <code>{{ $route.params.notFound }}</code></p>
        <router-link :to="{name:'tasks'}">戻る</router-link>
    </div>

</template>