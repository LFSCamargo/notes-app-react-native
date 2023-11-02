import * as yup from 'yup';
import { useFormik } from 'formik'
import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter, useUser } from '../../hooks';

export function Welcome() {
  const { handlers } = useUser();
  const { reset } = useRouter();

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is a required field')
    }),
    validateOnChange: true,
    onSubmit(values) {
      handlers.onboard(values.name);
      reset({
        index: 0,
        routes: [{ name: 'Todos' }],
      })
    },
  })

  const handleChange = (name: string) => {
    formik.setFieldValue('name', name)
    formik.setFieldTouched('name', true)
  }

  return (
    <SafeAreaView className="bg-blue-500 flex-1 items-start justify-end">
      <View className="w-full flex-[0.4] px-3 pb-3">
      <View className="flex bg-white h-full rounded-xl p-4  w-full items-start justify-end">
        <Text className="text-lg -tracking-wider">Your offline note taking app</Text>
        <Text className="text-3xl font-bold -tracking-widest">Welcome to Take Note</Text>
        <View className="flex w-full">
          <Text className="-tracking-wider mt-2 mb-2">Please enter your name to continue</Text>
          <TextInput onChangeText={handleChange} className="border border-black border-dashed p-3 rounded-lg" placeholderTextColor="black" placeholder="John Doe" />
          {formik.errors.name && formik.touched.name && (
            <Text className="-tracking-wider text-red-500 mt-2 mb-2">{formik.errors.name}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => formik.handleSubmit()} className="bg-blue-500 mt-8 p-3 rounded-lg w-full">
          <Text className="text-white text-lg leading-5 text-center">Enter the app</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  )
}