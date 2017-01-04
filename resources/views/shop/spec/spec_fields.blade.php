<!-- Name Field -->
<div class="form-group col-sm-6">
    {!! Form::label('sort', '排序:') !!}
    {!! Form::text('sort', null, ['class' => 'form-control']) !!}
   
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('保存', ['class' => 'btn btn-primary']) !!}
    <a href="{!! url('specs') !!}" class="btn btn-default">Cancel</a>
</div>
