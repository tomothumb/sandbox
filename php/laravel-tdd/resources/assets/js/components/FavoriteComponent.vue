<template>
    <button type="submit" :class="classes" @click="toggle" >
        <span>+</span>
        <span v-text="count"></span>

    </button>
</template>

<script>
    export default {
        //{{ str_plural('Favorite', $reply->favorites->count()) }}

        props: ['reply'],
        data() {
            return {
                count : this.reply.favoritesCount,
                active: this.reply.isFavorited,

            }
        },
        computed: {
            classes(){
                return [
                    'btn',
                    this.active ? 'btn-secondary': 'btn-primary'
                ];
            },
            endpoint(){
                return '/replies/'+this.reply.id+'/favorites';
            }
        },
        methods:{
            toggle(){
                if(this.active){
                    this.destroy();
                }else{
                    this.create();
                }
            },
            destroy(){
                axios.delete( this.endpoint);
                this.count--;
                this.active = false;

            },
            create(){
                axios.post( this.endpoint);
                this.count++;
                this.active = true;
            }
        }
    }
</script>