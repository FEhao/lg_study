module.exports = grunt => {

  //  yarn grunt task_name(like foo, or ignore it to run default)

  // grunt.registerTask('foo', () => {
  //   console.log(123)
  // })
  
  // grunt.registerTask('bar', '任务描述', () => {
  //   console.log(123)
  // })

  // // grunt.registerTask('default', () => {
  // //   console.log(123)
  // // })


  // grunt.registerTask('async-task', function() {
  //   const done = this.async()
  //   setTimeout(() => {
  //     console.log('async works')
  //     done(false)
  //   }, 2000);
  // })

  // grunt.registerTask('foo', () => {
  //   console.log(123)
  //   return false
  // })
  
  // grunt.registerTask('bar', '任务描述', () => {
  //   console.log(123)
  // })

  // grunt.registerTask('default', ['foo', 'bar', 'async-task'])

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass,
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-sass')
}

