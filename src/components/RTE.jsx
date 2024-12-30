import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const RTE = ({ name, control, label, defaultValue = ''}) => {
  //props
  //control= responsible for take component here to there

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
      //  wrap into controller
        name={name || "content"}
        control={control} 
        // take control of state , value, data 
        render={({ field: { onChange } }) => (
            //what we want to tract and field 
            // inform when any change happen in filed

            // making editor
            <Editor
            apiKey='pami6ugxv3r7xaukyafo8vuz4eseerm7mn93v49j6p1f0o5p'
            initialValue={defaultValue}
            init={{
              //initialing setting for the tinymce editor
              initialValue:defaultValue,
              height:500,
              menubar:true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }" 
            }}
            onEditorChange={onChange}
            />
          )
        }


      />

    </div>
  )
}

export default RTE

//rich text editor

// bcoz  we making editor in diff. comonent and want to use in diff. file location so we need to use controller and it works same as forward ref.