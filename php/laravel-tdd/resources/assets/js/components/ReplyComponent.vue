<script>
    export default {
        props:['attributes'],
        data(){
            return{
                editing:false,
                body: this.attributes.body
            };
        },
        methods:{
            update(){
                axios.patch('/repliies/' + this.attributes.id, {
                    body:this.body
                });
            }
        }
    }
</script>
