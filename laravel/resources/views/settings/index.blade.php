@extends('layouts.app')

@section('content')
	<div class="container container2">
		<h2>
			Profile Settings
		</h2>
		<hr>
		<div class="row">
			<div class="col-xs-12 user_settings">
				<div class="row">
					<div class="col-xs-4">
						<span class="personal_info">User Name :</span>
					</div>
					<div class="col-xs-4">
						<p>{{ $user->name}}</p>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-4">
						<span class="personal_info">User Email :</span>
					</div>
					<div class="col-xs-4">
						<p>{{ $user->email}}</p>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-4">
						<span class="personal_info">User Password :</span>
					</div>
					<div class="col-xs-4">
						<p>You can change your password, press edit.</p>
					</div>
				</div>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-xs-4">
				<a href="/settings/edit" class="btn btn-primary" type="submit">Edit Account</a>
			</div>
			<div class="col-xs-4">
				<form method="POST" action="/settings">
					<input name="_method" type="hidden" value="DELETE">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<button class="btn btn-primary" type="submit">Delete Account</button>
				</form>
			</div>
		</div>
	</div>
@stop