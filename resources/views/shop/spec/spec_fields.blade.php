<!-- Name Field -->
<div class="form-group col-sm-6">
	{!! Form::label('name','规格名称:') !!}
	{!! Form::text('name',null,['class'=>'form-control']) !!}
</div>
<div class="form-group col-sm-6">
    {!! Form::label('sort', '排序:') !!}
    {!! Form::number('sort',null,['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('保存', ['class' => 'btn btn-primary']) !!}
    <a href="{!! url('specs') !!}" class="btn btn-default">Cancel</a>
</div>
