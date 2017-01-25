@extends('layouts.app')

@section('content')
	<div class="container">
		<div class=" container3">
			@if($errors->any())
				<ul class="alert alert-danger">
					@foreach ($errors->all() as $error)
						<li>{{ $error}}</li>
					@endforeach
				</ul>
			@endif
			<form method="POST" action="/settings" enctype="multipart/form-data">
				{{ method_field('PATCH')}}
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				<h3>Change Your Name</h3>
				<div class="form-group">
					<input value="{{ Auth::user()->name }}" class="form-control" type="text" name="name">
				</div>
				<h3>Change Your E-Mail Address</h3>
				<div class="form-group">
					<input value="{{ Auth::user()->email }}" class="form-control" type="email" name="email">
				</div>
				<h3>Change Your Password</h3>
				<div class="row">
					<div class="col-xs-3">
						<p>Current</p>
					</div>
					<div class="col-xs-9 form-group">
						<input class="form-control" type="password" name="old_password">
						 @if ($alert = Session::get('alert-danger'))
						    <div class="alert alert-danger">
						        {{ $alert }}
						    </div>
						@endif
					</div>
				</div>
				<div class="row">
					<div class="col-xs-3">
						<p>New</p>
					</div>
					<div class="col-xs-9 form-group">
						<input class="form-control" type="password" name="password">
						@if ($alert = Session::get('alert-info'))
						    <div class="alert alert-info">
						        {{ $alert }}
						    </div>
						@endif
					</div>
				</div>
				<div class="row">
					<div class="col-xs-3">
						<p>Confirm</p>
					</div>
					<div class="col-xs-9 form-group">
						<input class="form-control" type="password" name="password_confirmation">
						 @if ($errors->has('password_confirmation'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password_confirmation') }}</strong>
                            </span>
                        @endif
					</div>
				</div>
				<div class="form-group">
					<button class="btn btn-primary" type="submit">Save</button>
				</div>
			</form>
		</div>
	</div>
@stop