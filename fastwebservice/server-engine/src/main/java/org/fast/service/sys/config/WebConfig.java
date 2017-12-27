package org.fast.service.sys.config;

import org.fast.service.interceptor.UserTokenInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * Description:  SpringMvcConfig
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/10/3
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"org.fast.service.model", "org.fast.service.interceptor"})
public class WebConfig extends WebMvcConfigurerAdapter {
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/templates/");
        resolver.setSuffix(".html");
        resolver.setExposeContextBeansAsAttributes(true);
        return resolver;
    }

//    @Override
//    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
//        configurer.enable();
//    }
//
//    @Override
//    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
//        configurer.defaultContentType(MediaType.APPLICATION_JSON);
//    }

    /**
     * 映射路径中，*表示改目录下的任意字符，**表示改目录下任意多个目录的任意字符，/表示网站根路径
     *
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new UserTokenInterceptor()).addPathPatterns("/**").excludePathPatterns(new String[]{"/security/**", "/home/**"});
    }

    /**
     * Specify the cache period for the resources served by the resource handler, in seconds. The default is to not send any cache headers but to rely on last-modified timestamps only. Set to 0 in order to send cache headers that prevent caching, or to a positive number of seconds to send cache headers with the given max-age value.
     *
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**").addResourceLocations("/css/").setCachePeriod(31556926);
        registry.addResourceHandler("/js/**").addResourceLocations("/js/").setCachePeriod(31556926);
        registry.addResourceHandler("/img/**").addResourceLocations("/img/").setCachePeriod(31556926);
    }

//    @Bean
//    public RequestMappingHandlerAdapter requestMappingHandlerAdapter() {
//        RequestMappingHandlerAdapter adapter = new RequestMappingHandlerAdapter();
//        List converters = new ArrayList<>();
//        converters.add(new MappingJackson2HttpMessageConverter());
//        converters.add(new StringHttpMessageConverter());
//        converters.add(new FormHttpMessageConverter());
//        adapter.setMessageConverters(converters);
//        return adapter;
//    }

    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver viewResolver = new CommonsMultipartResolver();
        viewResolver.setDefaultEncoding("UTF-8");
        viewResolver.setMaxUploadSize(1024000000);
        viewResolver.setResolveLazily(true);
        viewResolver.setMaxInMemorySize(4096);
        return viewResolver;
    }
}
