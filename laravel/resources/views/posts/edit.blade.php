@extends('layouts.app')

@section('content')
	<div class="container container1">
		<h1>
			Edit Post : <a href="/posts/{{ $post->id}}">{{$post->title}}</a>
		</h1>
		@if($errors->any())
			<ul class="alert alert-danger">
				@foreach ($errors->all() as $error)
					<li>{{ $error}}</li>
				@endforeach
			</ul>
		@endif
		<form method="POST" action="/posts/{{$post->id}}" enctype="multipart/form-data">
			{{ method_field('PATCH')}}
			<input type="hidden" name="_token" value="{{ csrf_token() }}">
			<div class="form-group">
				<input class="form-control" value="{{$post->title}}" type="text" name="title" placeholder="Post Title">
			</div>
			<div class="form-group">
				<input id="image_value1" class="form-control" type="file" name="image">
				@if ($post->image)
					<div class="img" id="edit_img">
						<img src="/assets/images/{{ $post->image}}" width="50%" height="auto">
					</div>
				@endif
				<input class="btn btn-primary" id="delete_image" name="delete_image" type="button" value="Delete image">
				<input id="image_value" type="hidden" name="hidden_image" value="image">
			</div>
			<div class="form-group">
				<select class="form-control" name="category_id">
				  	@foreach($categories as $category)
				  	@if($post->category->name == $category->name)
				  	<option value="{{ $category->name}}" selected>{{ $category->name}}</option>
				  	@else
				  	<option value="{{ $category->name}}">{{ $category->name}}</option>
				  	@endif
				  	@endforeach
				</select>
			</div>
			<div class="form-group">
				<textarea class="form-control" rows="8" name="content" placeholder="Post Content">{{$post->content}}</textarea>
			</div>
			<div class="form-group">
				<button class="btn btn-primary" type="submit">Update Post</button>
			</div>
		</form>
	</div>
@stop