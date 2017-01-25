@extends('layouts.app')

@section('content')
	<div class="container container1">
		<h1>All Posts</h1>
		<div class="row">
			
			@foreach($posts as $post)
				<div class="col-xs-12 col-sm-6 postscontainer">
					<div class="posts">
						<a href="/posts/{{ $post->id}}"><h2>{{ $post->title}}</h2></a>
						@if ($post->image)
						<div class="img">
							<img src="/assets/images/{{ $post->image}}" width="100%" height="auto">
						</div>
						@endif
						<p>{{ $post->content}}</p>
					</div>
				</div>
			@endforeach
		</div>
		<hr>
		<h1><a href="/posts/create">Add New Posts</a></h1>
	</div>
@stop