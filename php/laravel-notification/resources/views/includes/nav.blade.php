<style>
    #header_nav {
        background-color: #EFEFEF;
        color: #636b6f;
        margin: 0;
        padding:10px;
    }
    #header_nav ul{
        list-style: none;
    }
    #header_nav li{
        display: inline-block;
        margin-right: 10px;
    }
</style>

<nav id="header_nav">
    <p>{{$user->name}}</p>
    <ul>
        <li><a href="/user/{{$user->id}}"> フォロー一覧</a></li>
        <li><a href="/user/{{$user->id}}/post/"> 投稿一覧</a></li>
        <li><a href="/user/{{$user->id}}/post/new"> 投稿新規作成</a></li>
    </ul>
</nav>