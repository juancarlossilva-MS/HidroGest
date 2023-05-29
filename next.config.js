

module.exports = {
  webpack: (config) => {

	

	
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]
   
    return config
  },
  env: {
    APPLICATION_SECRET: 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCTRrl2cl0QRETu\n7ZKA8+l9soBdZZB2x96lTG14Jvwy4QBJFvnBJAmQ682rIHbJueRxxRLJtakFFZhJ\nb/26CDxhVqquUT11NME4uhzsNP721gjeEpxr+3t5R/Go4OX8QEYnWBpNPsA+0D1I\nE1DiG5GQBgHGIGpF+Ho5Gm6AC+6Je8VsfvHGTC+lEqqLMarxjjsBikGaEevQrfMD\nirUDunDjnFLGhpRGUgudiwlcYF958jjXI4OwkdllYqohbf7EB59zptgzxdDxgUCu\ncWULpQFYyJyl7vEzrxHHIvFPrlejkChSsrxdwzs02zUVZo8nIw60FcwSLmOFdYHF\nlsxJ+96JAgMBAAECggEACQtMkTLJjBnD1EVdcWhTzs7dqv6f82oSPjtA32JLgLII\nYwn+E+eLOS2rOhFQDNLK2IFmRjdO63DtosLgcA0Yl3oA7hwEkWmdh7GG3FWOe74z\nRLScC6s2+atv8nOUhAa2wtdE+Y3l3zr0AcoCi07EmWAuZIpHOcfzdNrD7ZPuAIjJ\nUSlHvi6NqYv/siX1iWRr9gq4r8km4p0P8NVa5AsYPqq4Yr01OGbeS6ySmuzo34Ft\nGmUA72SStiV1hJaXMPz3XETW1xu24TRXZqRPT8a77Ic9iCRYma1ILKGeamgNbNsg\nJ0XA6CYO7hJz4TQqhucx+I238xTRseu9j3dj2CRDtQKBgQDLs+0VrU2otMQKleHY\n/3XHms2Ivj7sKJHw3NVEP5fxVbZzFCAXpFloIUbIGm8bbxl/swzb2EFusn8BYKQq\nDQh25PzhD+zx6VRoQbztw5b/1SzSF8U0u/rAhea3riEHBKx+Sh53uJjObHs/y5HV\nb4CYcYPS9yBYUS+HpAN3HeGAPQKBgQC5Fj5r3f0UTbDel92SXgWD5O/DssJI/IGO\njGEvxlXi/DFn/2+Bih4UyU+WCF63z5uE4bHuUIN3j3QYJpfWbWFhZfJciUYNOPsn\nm78Qq1Rke9Ue0X2KqQT9DBeprqAuL/6Iexz8A+BlFpxhFdEoxjwTRLyctdip2eTu\nmXXng3aQPQKBgD0NLg+DI3VeyCrMBSZ+WhR65wMG0eEBv8vKw/hyft2L7OTMsVmk\nnk9BOe+bTJWSVLgbN81kIShGQx5skocv5MuNkeT6Wu+eGPguS6uPJWCDya0mBqrp\ndBvjheSjQa7SzcgD+uGy58lmZgIWxxyLEKWfz/yYqI8PtgkXNRqsT/uZAoGBAJai\njecIYqMVn+9ptgEb2G1B9AlYAVuZdm/nvGk/iEMWcbdsYvoQyO6t8MHwyfXbV31M\nmp2UlYrHC/tj3Yu8tdapPBkn+AVm7LGNxnDwn9ywFAHjCcPCT7cLEm8dGmy8zvGR\nEUPie8yKHHe/Y91FiTs9ZCw+q7mBBxtRdm4XxnUZAoGAXfiQEr5+ZTHaS+08xIpn\nO1L6dGPsRC80GjKzfgVeagdVb2BDlTYM9zV+YPwxh3rItnxihhJSdSYu483s3rEU\nmFj836H+Nhs0HxwGCL6Pb53P5w1uBj3HBYy6B4SwTy0Q6zy85sKe1yS0Rn2FVDLR\nx8A5j1XWqrRlDqIKEiXtiW4=',
    KEY_JWT:process.env.KEY_JWT
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}
