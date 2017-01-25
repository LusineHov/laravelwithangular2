@extends('layouts.app')

@section('content')
	<div class="container container1">
		@if(Session::has('message'))
			<p class="alert alert-danger">{{ Session::get('message') }}</p>
		@endif
		<h1>
			posts's Details
		</h1>
		<div class="row">
			<div class="col-xs-12">
				<div class="post">
					<h1>
						{{ $post->title}}
					</h1>
					@if ($post->image)
					<div class="img">
						<img src="/assets/images/{{ $post->image}}" width="100%" height="auto">
					</div>
					@endif
					<p class="postcontent">
						{{ $post->content}}
					</p>
					<p>
						<span>Category: </span>{{ $post->category->name}}
					</p>
					<p>
						<span>Created by: </span>{{ $post->user->name}}
					</p>
					<p>
						<span>Created at: </span>{{ $post->created_at}}
					</p>
					<p>
						<span>Updated at: </span>{{ $post->updated_at}}
					</p>
				</div>
			</div>
		</div>
		@if (Auth::user()->id== $post->user->id)
		<div class="editbtn">
			<a class="btn btn-default" href="/posts/{{$post->id}}/edit" role="button">Edit Post</a>
		</div>
		@endif
	</div>
@stop