@extends('layouts.app')

@section('content')
	<div class="container container1">
		<h1>Add Post</h1>
		@if($errors->any())
			<ul class="alert alert-danger">
				@foreach ($errors->all() as $error)
					<li>{{ $error}}</li>
				@endforeach
			</ul>
		@endif
		<form method="POST" action="/posts" enctype="multipart/form-data">
			<input type="hidden" name="_token" value="{{ csrf_token() }}">
			<div class="form-group">
				<input class="form-control" type="text" name="title" placeholder="Post Title">
			</div>
			<div class="form-group">
				<input class="form-control" type="file" name="image">
			</div>
			<div class="form-group">
				<select class="form-control" name="category_id">
				@foreach($categories as $category)
				  	<option value="{{ $category->name}}">{{ $category->name}}</option>
				@endforeach
				</select>
			</div>
			<div class="form-group">
				<textarea class="form-control" rows="8" name="content" placeholder="Post Content"></textarea>
			</div>
			<div class="form-group">
				<button class="btn btn-primary" type="submit">Add Post</button>
			</div>
		</form>
	</div>
@stop