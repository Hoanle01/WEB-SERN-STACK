import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import TextAreaField from 'components/form-controls/TextAreaField';
import CategoryField from 'components/form-controls/CategoryField';
import GenderField from 'components/form-controls/GenderField';
import TextEditor from 'components/form-controls/TextEditor';
import { EditorState } from 'draft-js';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

function CreateProductForm(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imgProduct, setImgProduct] = useState();
  console.log("image",imgProduct)

 
  const schema = yup.object().shape({
    name: yup.string().required('Please enter product name'),
    price: yup
      .number()
      .required('Please enter product price')
      .typeError('Please enter product price'),
    content: yup.string().required('Please enter product content'),
    category_id: yup
      .number()
      .required('Please enter product category')
      .typeError('Please enter product category'),
      
      feature: yup
      .number()
      .required('Please enter product feature')
      .typeError('Please enter product feature'),
    sale: yup
      .number()
      .required('Please enter product feature')
      .typeError('Please enter product feature')
      .max(1)
      .min(0),
    
  });

  const form = useForm({
    defaultValues: {
      name: '',
      price: '',
      content: '',
      category_id: 2,
   
      feature: 0,
      sale: 0,

    },
    resolver: yupResolver(schema),
  });

   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  // const handleImgChange = () => {
  //   const file = imgRef.current.files[0];
  // };





  const handleSubmit = (values) => {

    console.log("content",values.intendedFor)

    const formData = new FormData();
    formData.append('name', values.name);
    
    formData.append('price', values.price);
    formData.append('content', values.content);
    formData.append(
      'description',
     
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    formData.append('index_categories', values.category_id);
    formData.append('feature', values.feature===1?"Yes":"No");
    formData.append('discount', values.sale===0?'No':`${values.sale*100}%`);
    formData.append('products', imgProduct);
    if (!props.onSubmit) return;
    console.log("formdata",formData)
    props.onSubmit(formData);
    form.reset({
      name: '',
      price: '',
      content: '',
      category_id: 2,
      feature: 0,
     
      sale: 0,
    });
    //  setImgProduct = 0
    setEditorState(EditorState.createEmpty());
    setImgProduct(null);
  };
  return (
    <div className='create-product'>
      <h3>T???o m???i s???n ph???m</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}enctype="multipart/form-data" method="POST">
        <InputField
          placeholder=''
          name='name'
          form={form}
          label='Nh???p t??n s???n ph???m'
        />
        <InputField
          placeholder='230000'
          name='price'
          form={form}
          label='Nh???p gi?? s???n ph???m'
        />
        <TextAreaField
          placeholder=''
          name='content'
          form={form}
          label='Nh???p n???i dung s???n ph???m'
        />
        <TextEditor
          label='Nh???p m?? t??? s???n ph???m'
          state={editorState}
          onChange={(values) => setEditorState(values)}
        />
        <CategoryField label='Ch???n danh m???c' form={form} name='category_id' />
        
          <GenderField
          label='N???i b???t'
          form={form}
          name='feature'
          title={['C??', 'Kh??ng']}
        />  
        <InputField
          placeholder='0.15'
          name='sale'
          form={form}
          label='Gi???m gi??'
          type='number'
        />
        <div
          className='input-field'
          style={{
            margin: '10px 0 0',
          }}
        >
          <p>Ch???n ???nh</p>
          <input
          
            type='file'
            id='img'
            name='img'
        
            style={{
              cursor: 'pointer',
            }}
            onChange={(e)=>setImgProduct(e.target.files[0])}
          />
          
        </div>
        <button
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '6px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            backgroundColor: 'rgb(1, 173, 171)',
            '&:hover': {
              opacity: '0.8',
            },
          }}
        >
          Th??m s???n ph???m
        </button>
      </form>
    </div>
  );
}

export default CreateProductForm;
