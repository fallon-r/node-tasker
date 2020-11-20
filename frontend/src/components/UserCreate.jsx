import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Container
  } from "@chakra-ui/react"

const UserCreate = () => {
    return (
<Container>
<FormControl id="createUser" isRequired>
                <FormLabel>Name:</FormLabel>
                <Input placeholder="Task Master" type='email'/>
                <FormLabel>Email:</FormLabel>
                <Input placeholder="taskmaster@email.com" type='email'/>
                <FormLabel>Password</FormLabel>
                <Input placeholder="password" type="password" />
            </FormControl>
            <Button type='submit'> Sign In </Button>
</Container>
    )
}

export default UserCreate